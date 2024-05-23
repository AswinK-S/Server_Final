import { IDoctor } from "./doctorEntity";
import { ISlot } from "./slotEntity";

export interface DoctorWithSlots {
    doctor: IDoctor;
    slots: ISlot[];
   }