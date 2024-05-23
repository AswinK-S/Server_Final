import mongoose, { Model, Schema } from "mongoose";
import { ISlot } from "../../../../entity/slotEntity";

const SlotSchema: Schema<ISlot> = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    count: {
        type: Number,
        required:true
    },
    shift: {
        type: String,
        required: true
    },
    status:{
        type:Boolean,
        default:true
    }
});

// Define virtual properties to calculate startTime and endTime based on the shift
SlotSchema.virtual('startTime').get(function(this: ISlot): Date {
    const date = this.date;
    switch (this.shift) {
        case 'Morning Shift':
            return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9, 0, 0);
        case 'Afternoon Shift':
            return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
        case 'Full Day':
            return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9, 0, 0);
        default:
            throw new Error('Invalid shift');
    }
});

SlotSchema.virtual('endTime').get(function(this: ISlot): Date {
    const date = this.date;
    switch (this.shift) {
        case 'Morning Shift':
            return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0);
        case 'Afternoon Shift':
            return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 17, 0, 0);
        case 'Full Day':
            return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 17, 0, 0);
        default:
            throw new Error('Invalid shift');
    }
});

const slotModel: Model<ISlot> = mongoose.model('Slot', SlotSchema);
export default slotModel;
