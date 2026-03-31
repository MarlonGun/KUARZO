import { View } from "react-native";
import CustomButton from "./CustomButton";

export const CardProduct = ({ producto, width = 280 }: { producto: any; width?: number }) => {
    const { nombre, descripcion, precio, imagen } = producto;

    return (
        <View style={{ width }} className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300">

            <View className="flex justify-center">
                <img
                    src={imagen}
                    alt={nombre}
                    className="h-[180px] object-contain"
                />
            </View>

            <h2 className="text-xl text-opensans-regular font-semibold text-gray-800 mt-4">
                {nombre}
            </h2>
            <p className="text-left text-sm text-opensans-regular text-gray-500 mt-2 mb-6 px-2">
                {descripcion}
            </p>

            <View className="flex flex-row justify-between items-center mt-4">

                <CustomButton className="flex-1 mr-4">Comprar</CustomButton>

                <span className="text-xl text-opensans-regular font-bold text-gray-800">
                    ${new Intl.NumberFormat("es-CO").format(precio)}
                </span>
            </View>

        </View>
    );
};