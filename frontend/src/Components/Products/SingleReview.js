import { VStack, HStack, Box, Text, Avatar, Divider, StackDivider, IconButton, Spacer } from "@chakra-ui/react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { StarIcon } from '@chakra-ui/icons';
import React from 'react'

function SingleReview() {

    const reviews = [
        {
            id: 1,
            name: "John Doe",
            rating: 4,
            avatar: "https://i.pravatar.cc/150?img=1",
            comment:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum turpis ac pretium convallis.",
            date: "2022-02-15",
        },
        {
            id: 2,
            name: "Jane Smith",
            rating: 5,
            avatar: "https://i.pravatar.cc/150?img=2",
            comment:
                "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            date: "2022-02-14",
        },
        {
            id: 3,
            name: "Bob Johnson",
            rating: 3,
            avatar: "https://i.pravatar.cc/150?img=3",
            comment:
                "Maecenas congue elit id est ullamcorper, a blandit lectus consequat. Nam at hendrerit ante.",
            date: "2022-02-13",
        },
    ];

    const starRating = (rating) => (
        <HStack spacing="1">
            {[1, 2, 3, 4, 5].map((value) => {
                // Calculate the star icon based on the current rating
                let starIcon =
                    value <= rating ? (
                        <FaStar />
                    ) : value - 0.5 === rating ? (
                        <FaStarHalfAlt />
                    ) : (
                        <FaRegStar />
                    );
                return (
                    <IconButton
                        key={value}
                        aria-label={`${value} stars`}
                        icon={starIcon}
                        colorScheme={value <= rating ? "yellow" : "gray"}
                    />
                );
            })}
        </HStack>
    )


    return (
        <>
            <VStack align="stretch" spacing="6" >

                <VStack align="stretch" spacing="6">
                    {reviews.map((review) => (
                        <Box key={review.id} p="4" shadow="md" borderWidth="1px" >
                            <HStack spacing="4">
                                <Avatar name={review.name} src={review.avatar} />
                                <HStack w='full'>
                                    <VStack align="stretch" spacing="2">
                                        <Text fontSize="lg" fontWeight="bold">
                                            {review.name}
                                        </Text>

                                        <Text fontSize="sm" color="gray.500">
                                            {review.date}
                                        </Text>
                                    </VStack>
                                    <Spacer />
                                    <HStack spacing={1} pr='3'>
                                        <Text fontSize={'lg'} fontWeight={"bold"}>4.0</Text>
                                        <Text fontSize={'2xl'} color="#72bfbc">&#9733;</Text>
                                    </HStack>
                                </HStack>
                            </HStack>
                            <Divider my="4" />
                            <Text fontSize={'2xl'}>{review.comment}</Text>
                        </Box>
                    ))}
                </VStack>
            </VStack>
        </>
    )
}

export default SingleReview