import React, { useEffect } from "react";
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

const Container = styled.div`
  * {
    font-family: "Noto Sans KR", sans-serif;
  }
`;

const skipLoopCycleOnce = async () => await delayPromise(1);

const getSelectionText = () => {
  const selection = window.getSelection();
  return selection ? selection.toString() : "";
};

const getSelectionNodeRect = () => {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    return rect;
  }
  return null;
};

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

interface Slot {
  id: string;
  name: string;
  isSelected?: boolean;
  // Add other properties as needed
}

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

  const requestGPT = () => {
    send("REQUEST");
  };

  const closeMessageBox = () => {
    send("CLOSE_MESSAGE_BOX");
  };

  const handleRequestClick = (slot: Slot) => {
    console.log("Request Clicked:", slot);
    updateSelectedSlot(slot.id);
  };

  const handleAddClick = (slot: Slot) => {
    console.log("Add Clicked:", slot);
    updateSelectedSlot(slot.id);
  };

  const handleEditClick = (slot: Slot) => {
    console.log("Edit Clicked:", slot);
    updateSelectedSlot(slot.id);
  };

  return (
    <Container>
      {state.hasTag("showRequestButton") && (
        <GPTRequestButton
          onClick={requestGPT}
          loading={state.matches("loading")}
          top={state.context.requestButtonPosition.top}
          left={state.context.requestButtonPosition.left}
          onRequestClick={handleRequestClick}
          onAddClick={handleAddClick}
          onEditClick={handleEditClick}
          selectedSlot={selectedSlot}
        //updateSelectedSlot={updateSelectedSlot} // Add this line
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