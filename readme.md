# ReactNative
 
 React Native, tout comme React, est une librairie créée par Facebook. Il s’agit d’une déclinaison de React réservée aux mobiles.

## Une application en React Native utilisera :

**La librairie React** : on y retrouvera donc toute la gestion de React : la logique des composants, propriétés, états, inverse data flow, Redux, ..
La surcouche React Native qui adapte React aux fonctionnalités du smartphone
React Native va donc proposer un ensemble de composants clés en main pour pouvoir gérer les différents éléments graphiques du mobile ainsi qu’un ensemble de fonctionnalités liées aux devices (gestion de la vibration, récupération des informations de dimensions de l’écran, remontée si l’application est au premier plan ou non, etc)

### 1.1 Qu’est ce qui change avec React Native ?
Avec React, nous étions sur des applications web, il était donc possible d’utiliser les balises HTML (div, input, …). Avec React Native, nous nous affranchissons du navigateur : plus de balises HTML. Pour remplacer ces balises, React Native propose justement des composants et certaines propriétés pour remplacer le HTML :


```
<div> devient <View>
<p> devient <Text>
onClick devient onPress
```

### 1.2  Et Expo, c’est React Native ?
Expo est une suite d’outils open-source pour faciliter la création d’applications mobiles grâce à React Native. Expo propose tout un écosystème permettant de développer en React Native tout en ajoutant des briques clé en main pour simplifier le développement des applications mobiles.

Expo propose une librairie pour se brancher aux fonctionnalités natives du téléphone. Pour gérer l’appareil photo, afficher une map, utiliser le signin via Facebook par exemple, tout est directement proposé et géré par Expo que ce soit pour Android ou IOS.
Expo propose également d’émuler votre application directement sur votre mobile grâce à Expo Client, application installable sur votre smartphone.
Pas besoin de générer les applications via les environnements de développement. Xcode ou Android Studio pour les tester, nous pouvons les émuler directement sur le mobile.

Expo facilite également la publication de vos applications sur les différents stores et les mises à jour “à la volée” sans passer par une nouvelle validation de votre application.



## 2 - STEP BY STEP
On installe l’outil Expo en ligne de commande (ne pas oublier d’ajouter sudo devant la commande si vous êtes sous MacOS)
`npm install -g expo-cli`


On crée notre application (sélectionner “blank”)
`expo init monApplication --npm`


On rentre dans le répertoire généré
`cd monApplication`


On lance l’application
`expo start`

Un écran apparaît dans votre navigateur.

On installe Expo client sur son smartphone en se connectant sur le même réseau WiFi que son ordinateur
On scanne avec son smartphone le code barre affiché sur le navigateur
Avec l’appareil photo pour iOS ou directement avec l’application Expo sous Android. L’application va se builder et se lancer sur votre smartphone.

**Votre application est fonctionnelle !**

### 2.1  Un exemple de composant : App.js

```
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
return (
  <View style={styles.container}>
    <Text>Open up App.js to start working on your app!</Text>
    <StatusBar style="auto" />
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},
});
```

### 2.1.1 On importe la status-bar proposée par expo

`import { StatusBar } from 'expo-status-bar';`

Ce composant est proposé par expo pour configurer la barre de status de votre mobile.

Pour chaque fonctionnalité ou composant Expo, pensez à consulter la documentation fournie par Expo.

Elle nous donne des informations et des exemples d’utilisation  : https://docs.expo.io/versions/latest/sdk/status-bar/

### 2.1.2 On importe React

`import React from 'react';`

Avec React Native, nous utilisons les mécaniques de React. Nous avons besoin d’importer React.

### 2.1.3 On importe les composants de base proposés par React Native

`import { StyleSheet, Text, View } from 'react-native';`

Plus de HTML en React Native, nous importons les composants propres à React Native (<View> à la place de <div>, <Text> au lieu de <p> et StyleSheet pour le style).

On définit le style :

```
const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},
});
```

On utilise StyleSheet pour créer un style “container” qui sera utilisé dans notre composant.

### 2.1.4 On crée notre composant App

```
export default function App() {
return (
  <View style={styles.container}>
    <Text>Open up App.js to start working on your app!</Text>
    <StatusBar style="auto" />
  </View>
);
}
```
On crée une View à laquelle  on applique le style “container”.

À l’intérieur de cette View, nous utilisons le composant <Text> ainsi que le composant <StatusBar>.



## 3 - CRASH SOUS MACOS
Dans certaines circonstances (version récente de l’OS, projet volumineux…), l’application peut subitement crasher sous MacOS avec le message suivant : “Error: EMFILE: too many open files, watch”

Voici les différentes étapes à suivre afin de régler définitivement ce problème en installant watchman, un utilitaire permettant de surveiller plus efficacement les modifications des fichiers au sein d’un projet React Native.

### 3.1  Installation du gestionnaire de package Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

### 3.2  Installation de l’utilitaire watchman
brew install watchman

**Attention : l’installation de ces deux programmes peut durer plusieurs minutes. Il vous suffira de relancer votre projet via la commande expo start 😉**




**CHALLENGE**

## 1 - NAVIGATION SIMPLE

👉Initialisez une nouvelle app appelée reactnaviation-stack-demo.

👉Créez 2 composants nommés "HomeScreen" et "PageAScreen".

👉Mettez la couleur de fond #e67e22 pour "HomeScreen" et #2ecc71 pour "PageAScreen".

👉Mettez en place les liens suivants :

Un lien nommé "go to page A" sur "HomeScreen" permettant de rediriger l'utilisateur vers "PageAScreen"
Un lien nommé "go to Home" sur "PageAScreen" permettant de rediriger l'utilisateur vers "HomeScreen"


## 2 - NAVIGATION AVEC MENU

👉 Initialisez une nouvelle app appelée reactnaviation-tabs-demo.

👉 Créez 2 composants nommés "HomeScreen" et "PageAScreen".

👉 Mettez la couleur de fond #9b59b6 pour "HomeScreen" et #3498db pour "PageAScreen".

👉 Liez les deux composants entre eux via un "Bottom Tab Navigator".

👉 Customisez le menu en y ajoutant deux icons. Utilisez le lien suivant pour avoir la liste complète des icons disponibles dans React Native : https://icons.expo.fyi/ 

Sélectionnez l'icône "home" pour "HomeScreen".
Sélectionnez l'icône "heart" pour "PageAScreen.



## 3 - MIXER LES DEUX TYPES DE NAVIGATION

Prenez bien le temps de comprendre cette mécanique afin de savoir comment créer et imbriquer les composants de navigation entre eux :

https://reactnavigation.org/docs/5.x/nesting-navigators 


👉 Initialisez une nouvelle app appelée reactnaviation-combo-demo.

👉 Créez 3 composants nommés "HomeScreen", "PageAScreen" et "PageBScreen".

👉 Mettez la couleur de fond #9b59b6 pour "HomeScreen", #3498db pour "PageAScreen" et #f1c40f pour "PageBScreen".

👉 Liez les composants "PageAScreen" et "PageBScreen" entre eux via un "Stack Navigator".

👉 Mettez en place les liens suivants :

Un lien nommé "go to page B" sur "PageAScreen" permettant de rediriger l'utilisateur vers "PageBScreen".
Un lien nommé "go to page A" sur "PageBScreen" permettant de rediriger l'utilisateur vers "PageAScreen".
Sauvegardez la fonction stack navigator générée dans une variable nommée "StackNavigator".
Créez un BottomTabNavigator qui sera retourné dans le composant App et qui inclura le StackNavigator précédemment créé (votre menu affichera 2 onglets : “Home” qui sera relié au composant HomeScreen et “PagesStacks” qui sera relié à votre variable StackNavigator)
👉 Customisez le menu en y ajoutant deux icons.

Sélectionnez l'icône "home" pour "HomeScreen".
Sélectionnez l'icône "heart" pour "PagesStack”.

👉 L'application permettra de récupérer le nom d'un user par le biais d'un formulaire dans HomeScreen. A l'aide du contexte de React, stockez le nom dans le store
Et afficher le nom dans "PageBScreen"