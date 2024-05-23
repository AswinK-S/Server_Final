import { Req } from "../../../../types/serverPackageTypes";
import userModel from "../../models/userModel";

export const getUsersData = async (req: Req, userModels: typeof userModel): Promise<object> => {
    try {
        const result = await userModels.aggregate([
            {
                $group: {
                    _id: null,
                    totalCount: { $sum: 1 },
                    blockedUsers: { $sum: { $cond: [{ $eq: ["$status", false] }, 1, 0] } }
                }
            }
        ]);
        
        const { totalCount, blockedUsers }: { totalCount: number; blockedUsers: number } = result[0];
        return {user:{totalCount,blockedUsers}}
    } catch (error) {
        throw (error as Error);
    }
};
