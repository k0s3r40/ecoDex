import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";

export const renderStars = (specimen_class) => {
        let starsCount = 0;
        specimen_class = specimen_class.toUpperCase()
        switch (specimen_class) {
            case 'COMMON':
                starsCount = 1;
                break;
            case 'RARE':
                starsCount = 2;
                break;
            case 'EPIC':
                starsCount = 3;
                break;
            case 'LEGENDARY':
                starsCount = 4;
                break;
            default:
                break;
        }

        const stars = [];
        for (let i = 0; i < starsCount; i++) {
            stars.push(<Ionicons key={i} name="star" size={30} color="orange"/>);
        }

        return stars;
    };
export const renderCategoryIcon = (category) => {
        let iconName;
        category = category.toUpperCase()
        switch (category) {
            case 'PLANT':
                iconName = 'rose';
                break;
            case 'MUSHROOM':
                iconName = 'nuclear-outline';
                break;
            case 'ANIMAL':
                iconName = 'paw';
                break;
            case 'INSECT':
                iconName = 'bug';
                break;
            default:
                iconName = 'image';
                break;
        }

        return <Ionicons name={iconName} size={30} color="green"/>;
    };