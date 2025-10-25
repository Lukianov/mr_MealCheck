import {ref} from "vue";

export interface GoalOption {
    id: string;
    title: string;
    description: string;
    iconLabel: string;
}

const GOAL_OPTIONS: GoalOption[] = [
    {
        id: "lose-weight",
        title: "Lose weight",
        description: "Build a calorie deficit with mindful meals",
        iconLabel: "LW",
    },
    {
        id: "gain-muscle",
        title: "Gain muscle",
        description: "Prioritise protein and structured workouts",
        iconLabel: "GM",
    },
    {
        id: "stay-balanced",
        title: "Stay balanced",
        description: "Maintain habits and keep energy steady",
        iconLabel: "SB",
    },
];

export const useGoalSelection = () => {
    const selectedGoal = ref<string>(GOAL_OPTIONS[0]?.id ?? "");

    const selectGoal = (goalId: string) => {
        selectedGoal.value = goalId;
    };

    return {
        goalOptions: GOAL_OPTIONS,
        selectedGoal,
        selectGoal,
    };
};
