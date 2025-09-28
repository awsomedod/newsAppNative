import { Pressable, Image, Text, View } from 'react-native';

export default function GoogleButton({ text }: { text: string }) {
  return (
    <View>
      <Pressable
        onPress={() => {}}
        className="w-full flex-row items-center justify-center gap-2
             rounded-lg border border-gray-300 bg-white
             px-4 py-2.5 shadow-sm
             active:bg-gray-100"
      >
        {/* Google Logo */}
        <Image
          source={{
            uri: 'https://www.gstatic.com/images/branding/product/1x/gsa_ios_64dp.png',
          }}
          className="h-5 w-5"
        />

        {/* Button text */}
        <Text className="text-sm font-medium text-gray-700">{text}</Text>
      </Pressable>
    </View>
  );
}
