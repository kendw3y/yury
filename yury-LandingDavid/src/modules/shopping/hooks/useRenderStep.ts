
import { useState } from "react";

export const useRenderStep = ( ) => {
    
    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState(0);
    
    const onContinue = () => {
        setDirection(1)
        setCurrentStep(currentStep + 1)
    }
    const onBack = () => {
        setDirection(-1)
        setCurrentStep(currentStep - 1)
    }
    
    return {
        currentStep,
        direction,
        onContinue,
        onBack
    }

}