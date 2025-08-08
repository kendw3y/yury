import { DeliveryForm, OrderSummary, PaymentMethod } from ".";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCar } from '../pages/ShoppingCar';
import { useCalculateTotal } from "../hooks/useCalculateTotal";
import { useRenderStep } from "../hooks/useRenderStep";

export const RenderStep = () => {
	const { total } = useCalculateTotal();
	const { currentStep, direction, onBack, onContinue } = useRenderStep();
	const render = () => {
		switch (currentStep) {
			case 1:
				return <ShoppingCar onContinue={onContinue}/>;
			case 2:
				return <DeliveryForm onBack={onBack} onContinue={onContinue} />;
			case 3:
				return <OrderSummary onBack={onBack} onContinue={onContinue} />;
			case 4:
				return <PaymentMethod onBack={onBack} total={total} />;
			default:
				return null;
		}
	};

	const variants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
		}),
		center: {
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			x: direction < 0 ? 1000 : -1000,
			opacity: 0,
		}),
	};

	return (
		<AnimatePresence mode="wait" custom={direction}>
			<motion.div
				key={currentStep}
				custom={direction}
				variants={variants}
				initial="enter"
				animate="center"
				exit="exit"
				transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
				className=" w-full "
			>
				{render()}
			</motion.div>
		</AnimatePresence>
	);
};
