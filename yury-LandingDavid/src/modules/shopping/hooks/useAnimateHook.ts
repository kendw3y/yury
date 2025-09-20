import { useState, useEffect, useRef } from "react"
import gsap from "gsap"

interface UseAnimatedSubtotalProps {
  products: Array<{ id: number; price: number; quantity: number }>
}

export const useAnimatedSubtotal = ({ products }: UseAnimatedSubtotalProps) => {
  const [displaySubtotal, setDisplaySubtotal] = useState<number>(0)
  const subtotalRef = useRef<HTMLSpanElement>(null)
  const prevSubtotal = useRef<number>(0)

  const calculateSubtotal = () => {
    return products.reduce((sum, product) => sum + product.price * product.quantity, 0)
  }

  useEffect(() => {
    const currentSubtotal = calculateSubtotal()

    if (currentSubtotal !== prevSubtotal.current) {
      gsap.to(prevSubtotal, {
        current: currentSubtotal,
        duration: 0.9,
        ease: "easeInOut",
        onUpdate: () => {
          setDisplaySubtotal(Number(prevSubtotal.current.toFixed(2)))
        },
        onStart: () => {
          if (subtotalRef.current) {
            gsap.fromTo(
              subtotalRef.current,
              {
                scale: 1,
                color:
                  currentSubtotal > prevSubtotal.current
                    ? "#4ade80"
                    : "#f87171",
              },
              {
                scale: 1,
                color: "#fccf08",
                duration: 0.8,
              }
            )
          }
        },
      })

      // Actualiza el valor interno al finalizar
      prevSubtotal.current = currentSubtotal
    }
  }, [products])

  return {
    displaySubtotal,
    subtotalRef,
  }
}