import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('screen');

export const COLORS = {
    primary: '#459103',
    title: '#0F4D21',
    white: '#FFFFFF',
    lightGrey: '#D3D6D6',
    grey: '#C1C0C9',
    blue: '#087BB6',
};

export const SIZES = {
    h1: 24,
    h2: 22,
    h3: 20,
    h4: 18,
    h5: 16,
    h6: 14,

    width,
    height,
}