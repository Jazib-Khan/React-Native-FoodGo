import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import LottieView from 'lottie-react-native';
import firebase from '.././firebase';
import MenuItems from "../components/restaurantDetail/MenuItems";

export default function OrderCompleted() {
    const [lastOrder, setLastOrder] = useState({
        items: [
            {
                title: "Pasta",
                description: "With butter lettuce, tomato and sauce",
                price: "£13",
                image: 
                    "https://www.budgetbytes.com/wp-content/uploads/2013/07/Creamy-Tomato-Spinach-Pasta-close.jpg",
            },
        ],
    });

    const { items, restaurantName } = useSelector((state) => state.cartReducer.selectedItems);

    const total = items.map((item) => Number(item.price.replace("£", ""))).reduce((prev, curr) => prev + curr, 0);

    const totalGBP = total.toLocaleString("en-GB", {
        style: "currency",
        currency: "GBP",
    });

    useEffect(() => {
        const db = firebase.firestore();
        const unsubscribe = db
            .collection("orders")
            .orderBy("createdAt", "desc")
            .limit(1)
            .onSnapshot((snapshot) => {
                snapshot.docs.map((doc) => {
                    setLastOrder(doc.data());
                });
            });

            return () => unsubscribe();
    }, []);

    const theme = useSelector((state) => state.themeReducer.theme);

    return (
        <SafeAreaView style={[styles.page, styles[`page${theme}`]]}>
            <View 
                style={{
                    margin: 15,
                    alignItems: 'center',
                    height: '100%',
                }}
            >
                <LottieView 
                    style={{ height: 100, alignSelf: 'center', marginBottom: 30 }} 
                    source={require('../assets/animations/check-mark.json')}
                    autoPlay
                    speed={0.5}
                    loop={false}
                />
                <Text style={[styles.text, styles[`text${theme}`]]}>
                    Your order at {restaurantName} has been placed for £{totalGBP}
                </Text>
                <ScrollView>
                    <MenuItems 
                        foods={lastOrder.items} 
                        hideCheckbox={true}
                        marginLeft={10}
                    />
                    <LottieView 
                        style={{height: 200, alignSelf: 'center'}} 
                        source={require('../assets/animations/cooking.json')}
                        autoPlay
                        speed={0.5}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1, 
        backgroundColor: 'white' 
    },
    pageDark: {
        backgroundColor: "black"
    },
    text:{
        fontSize: 20, 
        fontWeight: 'bold'
    },
    textDark: {
        color: 'white'
    }
});