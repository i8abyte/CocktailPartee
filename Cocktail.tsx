import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import React from 'react';

const cocktailUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin';

type Cocktail = {
  strDrink: string,
  strDrinkThumb: string,
  idDrink: string
}[];

const Cocktail = () => {
  const [drinks, setDrinks] = React.useState([] as Cocktail);

  React.useEffect(() => {
    getCocktailWithAxios(cocktailUrl);
  }, []);

  const getCocktailWithAxios = async (cocktailUrl: string) => {
    const res = await axios.get(cocktailUrl);
    setDrinks(res.data.drinks);
  };

  if (!drinks) { 
    return <View><Text>No cocktails</Text></View>
  }

  return (
    <View>
      <Text>Cocktails</Text>
      <ScrollView>
        <View>
          {drinks.map((drink) => (
            <View>
              <Text>{drink.strDrink}</Text>
              <Image source={{uri: drink.strDrinkThumb}}
                     style={{width: 100, height: 100}}/>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default Cocktail;