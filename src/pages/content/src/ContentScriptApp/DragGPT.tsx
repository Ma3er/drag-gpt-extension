import { useEffect, useState } from "react";
import GPTRequestButton from "@pages/content/src/ContentScriptApp/components/GPTRequestButton";
import ResponseMessageBox from "@pages/content/src/ContentScriptApp/components/messageBox/ResponseMessageBox";
import ErrorMessageBox from "@pages/content/src/ContentScriptApp/components/messageBox/ErrorMessageBox";
import { useMachine } from "@xstate/react";
import delayPromise from "@pages/content/src/ContentScriptApp/utils/delayPromise";
import dragStateMachine from "@pages/content/src/ContentScriptApp/xState/dragStateMachine";
import { sendMessageToBackground } from "@src/chrome/message";
import styled from "@emotion/styled";
import { getPositionOnScreen } from "@pages/content/src/ContentScriptApp/utils/getPositionOnScreen";
import useSelectedSlot from "@pages/content/src/ContentScriptApp/hooks/useSelectedSlot";
import ChatText from "@src/shared/component/ChatText";
import AssistantChat from "@src/shared/component/AssistantChat";
import MessageBox from "@pages/content/src/ContentScriptApp/components/messageBox/MessageBox";
import { t } from "@src/chrome/i18n";

// Correctly import changeSlot
import changeSlot from "@src/pages/popup/xState/slotListPageStateMachine";

// Ensure RequiredDataNullableInput is exported
import { RequiredDataNullableInput } from "@src/pages/background/index";

// Original Container styled component
const Container = styled.div`
  * {
    font-family: "Noto Sans KR", sans-serif;
  }
`;

// Original Slot interface
interface Slot {
  id: string;
  name: string;
  isSelected?: boolean;
  // Add other properties as needed
}

// Original skipLoopCycleOnce function
const skipLoopCycleOnce = async () => await delayPromise(1);

// Original getSelectionText function
const getSelectionText = () => {
  const selection = window.getSelection();
  return selection ? selection.toString() : "";
};

// Original getSelectionNodeRect function
const getSelectionNodeRect = () => {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    return rect;
  }
  return null;
};

// Original getGPTResponseAsStream function
async function getGPTResponseAsStream({
  input,
  onDelta,
  onFinish,
}: {
  input: string;
  onDelta: (delta: string) => void;
  onFinish: () => void;
}) {
  return new Promise<{ firstChunk: string }>((resolve, reject) => {
    sendMessageToBackground({
      message: {
        type: "RequestInitialDragGPTStream",
        input,
      },
      handleSuccess: (response) => {
        if (response.isDone || !response.chunk) {
          return onFinish();
        }
        resolve({ firstChunk: response.chunk });
        onDelta(response.chunk);
      },
      handleError: reject,
    });
  });
}

// New DragGPT component
function DragGPT() {
  const { selectedSlot, updateSelectedSlot } = useSelectedSlot();
  const [state, send] = useMachine(dragStateMachine, {
    actions: {
      setPositionOnScreen: (context) => {
        const { left, width, height, top } = context.selectedTextNodeRect;
        const verticalCenter = left + width / 2;
        const horizontalCenter = top + height / 2;
        context.positionOnScreen = getPositionOnScreen({
          horizontalCenter,
          verticalCenter,
        });
      },
    },
    services: {
      getGPTResponse: (context) =>
        getGPTResponseAsStream({
          input: context.selectedText,
          onDelta: (chunk) => send("RECEIVE_ING", { data: chunk }),
          onFinish: () => send("RECEIVE_END"),
        }),
    },
    devTools: true,
  });

  const [requestPending, setRequestPending] = useState(false);

  useEffect(() => {
    const onMouseUp = async (event: MouseEvent) => {
      await skipLoopCycleOnce();
      send({
        type: "TEXT_SELECTED",
        data: {
          selectedText: getSelectionText(),
          selectedNodeRect: getSelectionNodeRect() || undefined,
          requestButtonPosition: {
            top: event.clientY + window.scrollY,
            left: event.clientX + window.scrollX,
          },
        },
      });
    };
    window.document.addEventListener("mouseup", onMouseUp);
    return () => {
      window.document.removeEventListener("mouseup", onMouseUp);
    };
  }, [send]);

  useEffect(() => {
    if (requestPending && selectedSlot) {
      console.log("↗️Request GPT initiated");
      console.log("↗️❌requestGPT Current state before request:❌", state, selectedSlot);
      send("REQUEST");
      console.log("↗️✖️Current state after request: ✖️", state, selectedSlot);
      setRequestPending(false);
    }
  }, [selectedSlot, requestPending, state, send]);

  const closeMessageBox = () => {
    send("CLOSE_MESSAGE_BOX");
  };

  const handleRequestClick = async (slot: Slot) => {
    console.log("↗️Chat 1 🟨 default 🟨Clicked:", slot);
    console.log("↗️Current selectedSlot:", selectedSlot);
    await updateSelectedSlot(slot.id);
    setRequestPending(true);
  };

  const handleAddClick = async (slot: Slot) => {
    console.log("↗️Chat 2 🟩 twitter 🟩 Clicked:", slot);
    console.log("↗️Current selectedSlot:", selectedSlot);
    await updateSelectedSlot(slot.id);
    setRequestPending(true);
  };

  const handleEditClick = async (slot: Slot) => {
    console.log("↗️Chat 3 🟥 x.com 🟥Clicked:", slot);
    console.log("↗️Current selectedSlot:", selectedSlot);
    await updateSelectedSlot(slot.id);
    setRequestPending(true);
  };

  const defaultSelectSlot = (slot: Slot) => {
    console.log("↗️Default selectSlot function called with slot:", slot);
    console.log("↗️Current ⭐selectedSlot ⭐:", selectedSlot);
  };

  const handleUpdatedSlots = (slot: Slot) => {
    console.log("↗️Updated Slots ♻️:", slot);
    console.log("↗️Current selectedSlot🟢:", selectedSlot);
  };

  return (
    <Container>
      {state.hasTag("showRequestButton") && (
        <GPTRequestButton
          top={state.context.requestButtonPosition.top}
          left={state.context.requestButtonPosition.left}
          loading={state.matches("loading")}
          onRequestClick={handleRequestClick}
          onAddClick={handleAddClick}
          onEditClick={handleEditClick}
          updatedSlots={handleUpdatedSlots}
          selectSlot={selectedSlot ? () => selectedSlot : defaultSelectSlot}
          selectedSlot={selectedSlot}
        />
      )}
      {state.matches("temp_response_message_box") && (
        <MessageBox
          header={t("responseMessageBox_responseTitle")}
          content={
            <AssistantChat>
              <ChatText>{state.context.chats.at(-1)?.content}</ChatText>
            </AssistantChat>
          }
          width={480}
          isOutsideClickDisabled={true}
          onClose={() => send("RECEIVE_CANCEL")}
          anchorTop={state.context.anchorNodePosition.top}
          anchorCenter={state.context.anchorNodePosition.center}
          anchorBottom={state.context.anchorNodePosition.bottom}
          positionOnScreen={state.context.positionOnScreen}
        />
      )}
      {state.hasTag("showResponseMessages") && (
        <ResponseMessageBox
          onClose={closeMessageBox}
          initialChats={state.context.chats}
          anchorTop={state.context.anchorNodePosition.top}
          anchorCenter={state.context.anchorNodePosition.center}
          anchorBottom={state.context.anchorNodePosition.bottom}
          positionOnScreen={state.context.positionOnScreen}
        />
      )}
      {state.matches("error_message_box") && (
        <ErrorMessageBox
          onClose={closeMessageBox}
          error={state.context.error}
          anchorTop={state.context.anchorNodePosition.top}
          anchorCenter={state.context.anchorNodePosition.center}
          anchorBottom={state.context.anchorNodePosition.bottom}
          positionOnScreen={state.context.positionOnScreen}
        />
      )}
    </Container>
  );
}

export default DragGPT;
