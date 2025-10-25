import { ref } from "vue";
import {RouteName, router} from "@/shared/lib/router";

export const useOnboarding = () => {
    const currentSlideIndex = ref(2)

    const goToNextSlide = () => {
        if (currentSlideIndex.value === 4) {
            void router.push({ name: RouteName.Main })

            return
        }

        debugger

        currentSlideIndex.value = currentSlideIndex.value + 1
    }

    return {
        currentSlideIndex,
        goToNextSlide
    }
}
