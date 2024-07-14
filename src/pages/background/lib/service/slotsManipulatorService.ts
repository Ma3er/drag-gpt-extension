export class SlotsManipulatorService {
  static getSelectedSlot(slots: Slot[]): Slot | undefined {
    return slots.find(({ isSelected }) => isSelected);
  }

  static getSelectedSlotIndex(slots: Slot[]): number | undefined {
    const index = slots.findIndex(({ isSelected }) => isSelected);
    return index >= 0 ? index : undefined;
  }

  static addSlot(slots: Slot[], slot: Slot): Slot[] {
    return [...slots, slot];
  }
<<<<<<< HEAD
// this updateSlot is fot the update of the slot
=======

>>>>>>> 2cd2bd140c362c9499975d59ee798fcb3d5e282a
  static updateSlot(slots: Slot[], slot: Slot): Slot[] {
    return slots.reduce<Slot[]>((previousValue, currentValue) => {
      if (currentValue.id === slot.id) {
        return previousValue.concat(slot);
      }
      return previousValue.concat(currentValue);
    }, []);
  }

  static deleteSlot(slots: Slot[], slotId: string): Slot[] {
    return slots.filter((slot) => slot.id !== slotId);
  }
}
