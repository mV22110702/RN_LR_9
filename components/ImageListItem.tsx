import * as React from "react";
import {FC} from "react";
import {Heading, Image, VStack} from "native-base";
import {ImageInfo} from "../types/types";

export const ImageListItem: FC<{ image: ImageInfo }> = ({image}) => {
    return (
        <VStack space={10} px={10}>
            <Image source={{uri: image.url}} size={300} alt={image.description}/>
            <Heading>{image.description ?? 'No description provided'}</Heading>
        </VStack>
    );
};
