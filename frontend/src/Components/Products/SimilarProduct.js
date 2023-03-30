import { Box, Button, Center, Circle, IconButton, Flex, Spacer, Badge, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Grid, GridItem, Heading, HStack, Image, SimpleGrid, StackDivider, Text, VStack, Icon, InputGroup, Input, InputRightElement, Toast, useToast } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons';
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import { BsHandbag, BsTruck } from 'react-icons/bs'
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import React from 'react'
import noImage from "../../images/default.jpg"

function SimilarProduct() {

    

    return (
        <>
            <Box maxW='20em' borderWidth='1px' borderRadius='lg' overflow={'hidden'}>
                <Image src={noImage} alt='alt' style={{objectFit:'contain', height:'10rem'}} />

                <Box p='6'>
                    <Box display={'flex'} alignItems='baseline'>
                        <Box
                            color='gray.500'
                            fontWeight='semibold'
                            letterSpacing='wide'
                            fontSize='xs'
                            textTransform='uppercase'
                            ml='2'
                        >
                            3 beds  2 baths
                        </Box>
                    </Box>
                    <Box
                        mt='1'
                        fontWeight='semibold'
                        as='h4'
                        lineHeight='tight'
                        noOfLines={1}
                    >
                        Asus Laptop
                    </Box>

                    <Box>
                        ₹ 60,000
                    </Box>

                    <Box display='flex' mt='2' alignItems='center' >
                        <HStack spacing={1}>
                            <Text fontWeight={"bold"}>4.0</Text>
                            <Text color="#72bfbc">&#9733;</Text>
                        </HStack>
                        <HStack spacing={1}>
                            <Text color="#e0e0e0" fontWeight={"bold"}>|</Text>
                            <Text fontWeight={300} color="#535766" > 20 Ratings</Text>
                        </HStack>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default SimilarProduct