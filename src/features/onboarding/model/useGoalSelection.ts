import {ref} from "vue";

export interface GoalOption {
    id: string;
    title: string;
    description?: string;
    imageUrl?: string;
}

const GOAL_OPTIONS: GoalOption[] = [
    {
        id: "lose-weight",
        title: "Lose weight",
        description: "Build a calorie deficit with mindful meals",
    },
    {
        id: "gain-muscle",
        title: "Gain muscle",
        description: "Prioritise protein and structured workouts",
    },
    {
        id: "stay-balanced",
        title: "Stay balanced",
        description: "Maintain habits and keep energy steady",
    },
];

const GENDER_OPTIONS: GoalOption[] = [
    {
        id: "woman",
        title: "Woman",
        imageUrl: 'src/shared/assets/images/onboading/gender-slide-woman.png',
    },
    {
        id: "man",
        title: "Man",
        imageUrl: 'src/shared/assets/images/onboading/gender-slide-man.png'
    },
]

const selectedGoal = ref<string>(GOAL_OPTIONS[0]?.id ?? "");

const selectedGender = ref<string>(GENDER_OPTIONS[1]?.id ?? "");

export const useGoalSelection = () => {
    const selectGoal = (goalId: string) => {
        selectedGoal.value = goalId;
    };

    const selectGender = (genderId: string) => {
        selectedGender.value = genderId;
    }

    return {
        goalOptions: GOAL_OPTIONS,
        genderOptions: GENDER_OPTIONS,
        selectedGoal,
        selectedGender,
        selectGoal,
        selectGender,
    };
};
