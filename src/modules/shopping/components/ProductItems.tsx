import { useShoppingCar } from "@/hooks/useShoppingCar"
import { Item } from "./Item"

type Props = {}

export const ProductItems = ({}: Props) => {
  const {items} = useShoppingCar()
  return (
    <div className="rounded-lg md:w-[800px] ">
      {items?.map(product => (
        <Item key={product.id} product={product}/>
      ))}
    </div>
  )
}