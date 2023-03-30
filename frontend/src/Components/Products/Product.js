import { Box, Button, Center, Circle, Flex, Spacer, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Grid, GridItem, Heading, HStack, Image, SimpleGrid, StackDivider, Text, VStack, Icon, IconButton, InputGroup, Input, InputRightElement, Toast, useToast } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { BsHandbag, BsTruck } from 'react-icons/bs'
import { CiPercent } from 'react-icons/ci'
import SimilarProduct from './SimilarProduct'
import SingleReview from './SingleReview';
import image1 from "../../images/carousel-2.jpg"
import { fetchSingleProduct } from "../../Actions/Product";
import{useSelector, useDispatch} from "react-redux"
import { useParams } from 'react-router-dom';

function Product() {
  const params = useParams()
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedImage, setSelectedIMage] = useState();

  const id = params.id;


  const {product, loading} = useSelector(state => state.product)
  // console.log(product.images[0]);

  useEffect(() => {
    // if (error) {
    //   alert.error(error);
    //   dispatch(singleProductSliceActions.setsproductReset());
    // }
    // if (success) { 
    //   newReviewActions.newReviewReset()
    // }
    // if (reviewError) {
    //   newReviewActions.newReviewReset()
    // }
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id]);

  const handleImageClick = (src) => {
    setSelectedIMage(src);
  };

  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    if (rating === value) {
      // If the user clicks on the same star twice, reset the rating
      setRating(0);
    } else {
      setRating(value);
    }
  };


  const style = {
    hover: {
      transform: "scale(110%)",
      transition: "transform 1s, filter .20s ease-in-out",
      transformOrigin: "center center",
      filter: "brightness(95%)"
    },

    style: {
      // marginTop:"6em",
      overflow: "hidden"
    }
  }

  return (
    <>
 

      {!loading ? <><Box w={"full"}
        mt={"7em"}
        p={"25px 30px"}>
        <Grid templateColumns={"55% 40%"} gap={8} w="full">
          <Box
            position={"sticky"}
            top="0px"
            h="max-content"
            ml='8em'
          >

            <Grid
              h='50rem'
              templateRows='repeat(4, 1fr)'
              templateColumns='repeat(6, 1fr)'
              gap={2}
              overflow='scroll'
            >
              <GridItem colSpan={1} rowStart='1' colStart='1' >
                <Image src={product.images.length > 0 ? product.images[0].url : image1 } w='100%' _hover={style.hover} onClick={() => handleImageClick(product.images[0].url)} style={{objectFit:'contain', height:'100%', width:'100%'}} />
              </GridItem>
              <GridItem colSpan={1} rowStart='2' colStart='1'  >
                <Image  src={product.images.length > 0? product.images[1].url : image1} objectFit='scale-down' _hover={style.hover} onClick={() => handleImageClick(product.images[1].url)} style={{objectFit:'contain', height:'100%', width:'100%'}} />
              </GridItem>
              <GridItem colSpan={1} rowStart='3' colStart='1'  >
                <Image _hover={style.hover} src={product.images.length > 0 ? product.images[2].url : image1} objectFit='scale-down' onClick={() => handleImageClick(product.images[2].url)} style={{objectFit:'contain', height:'100%', width:'100%'}} />
              </GridItem>
              <GridItem rowSpan={4} colSpan={5} colStart='2' bg='#e4e4e5'  >
                <Image src={!selectedImage ? (product.images.length > 0 ? product.images[0].url : image1) : selectedImage} w='100%' style={{objectFit:'contain', height:'100%', width:'100%'}} />
              </GridItem>
            </Grid>


          </Box>
          {/* ............................. */}
          <Box

          >

            <VStack
              spacing={4}
              textAlign="left"
              align={'flex-start'}
              w={"full"}
              divider={<StackDivider borderColor='gray.200' />}

            >


              <Box w="full">
                <Heading fontWeight={"600"} as={"h2"} color="#282c3f" fontSize="28px" size="lg" > {product.name} </Heading>
                <Heading fontWeight={"300"} as={"h2"} color="#535665" fontSize="20px" size="lg">   {product.description}  </Heading>

                <Box w={"full"} mt="15px">
                  <HStack
                    w="max-content"
                    cursor={"pointer"}
                    transition={".5s all"}
                    spacing={"2px"}
                    border={"1px solid #e0e0e0"}
                    borderRadius="3px"
                    padding={"0.001em 4px"}
                    _hover={{ borderColor: "#282c3f" }}
                  >
                    <HStack spacing={1}>
                      <Text fontWeight={"bold"} style={{marginTop:'0.9em'}}>{product.ratings}</Text>
                      <Text color="#72bfbc" >&#9733;</Text>
                    </HStack>
                    <HStack spacing={1}>
                      <Text color="#e0e0e0" fontWeight={"bold"}>|</Text>
                      <Text fontWeight={300} color="#535766" > {product.reviews.length} Ratings</Text>
                    </HStack>
                  </HStack>

                </Box>

              </Box>
              {/* .................... */}

              <VStack align="flex-start" w="full" spacing={"20px"}>

                <VStack align="flex-start" w="full">
                  <HStack spacing={2}>
                    <Heading fontWeight={"600"} as={"h2"} color="#282c3f" fontSize="20px" size="lg" > {product.price} </Heading>
                    <HStack spacing={1}>
                      <Heading fontWeight={300} as={"h2"} color="#535665" fontSize="20px" size="lg"> MRP</Heading>
                      <Heading fontWeight={300} as={"h2"} color="#535665" fontSize="20px" size="lg" textDecoration={"line-through"}> {product.price + 0.1*product.price} </Heading>
                    </HStack>
                    <Heading fontWeight={"600"} as={"h2"} color="#ff905a" fontSize="20px" size="lg" > (10% OFF) </Heading>


                  </HStack>
                  <Text color={"#03a685"} fontSize="12px" fontWeight={"bold"}>inclusive of all taxes</Text>
                </VStack>



                <HStack>
                  <Button color={"#fff"} borderRadius={3} p="1em 2em" leftIcon={<BsHandbag />} colorScheme='green' variant={"solid"}>
                    ADD TO BAG
                  </Button>
                  <Button color={"#000"} borderRadius={3} p="1em 2em" colorScheme="cyan" variant={"outline"}>
                    BUY NOW
                  </Button>

                </HStack>

              </VStack>

              <VStack align="flex-start" w="full" spacing={"20px"}>
                <HStack>
                  <Text>DELIVERY OPTIONS</Text>
                  <Icon as={BsTruck} fontSize="xl" />
                </HStack>

                <Box>
                  <InputGroup size='md' >
                    <Input
                      focusBorderColor="#bdbdbd"
                      placeholder='Enter pincode'
                      maxLength={6}
                    />
                    <InputRightElement width='4.5rem'>
                      <Button variant={"unstyled"} color="green.600" >
                        Check
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Box>

                <VStack align="flex-start" w="full" spacing={"10px"} py="20px">
                  <Text color={"#282c3f"} fontSize="14px">100% Original Products</Text>
                  <Text color={"#282c3f"} fontSize="14px">Pay on delivery might be available</Text>
                  <Text color={"#282c3f"} fontSize="14px">Easy 10 days returns and exchanges</Text>
                  <Text color={"#282c3f"} fontSize="14px">Assured delivery</Text>
                </VStack>



              </VStack>

              <VStack align="flex-start" w="full" spacing={"20px"}>
                <HStack>
                  <Text>Best Offers</Text>
                  <Icon as={CiPercent} fontSize="xl" />
                </HStack>
                <HStack>
                  <Box maxW='8em' borderWidth='1px' borderRadius={'lg'} overflow='hidden' p={'2'}>
                    <Text fontWeight={'bold'} fontSize='16px'>Bank Offer</Text>
                    <Box mt='1' fontWeight={'semibold'} fontSize='12px' lineHeight='tight' noOfLines={'3'}>
                      Upto ₹ 15,000 discount on select Credit Cards
                    </Box>
                  </Box>
                  <Box maxW='8em' borderWidth='1px' borderRadius={'lg'} overflow='hidden' p={'2'}>
                    <Text fontWeight={'bold'} fontSize='16px'>No Cost EMI</Text>
                    <Box mt='1' fontWeight={'semibold'} fontSize='12px' lineHeight='tight' noOfLines={'3'}>
                      Upto ₹ 20,000 EMI Interest saving on Paying with ICICI Debit Cards
                    </Box>
                  </Box>
                  <Box maxW='8em' borderWidth='1px' borderRadius={'lg'} overflow='hidden' p={'2'}>
                    <Text fontWeight={'bold'} fontSize='16px'>Cash Back</Text>
                    <Box mt='1' fontWeight={'semibold'} fontSize='12px' lineHeight='tight' noOfLines={'3'}>
                      Upto ₹ 200 cashback on payment through Paytm or other UPI service providers
                    </Box>
                  </Box>
                </HStack>

              </VStack>

              <VStack align="flex-start" w="full" spacing={"20px"}>
                <HStack>
                  <Text>Product Details</Text>

                </HStack>
                <Text
                  color={"#282c3f"} fontSize="14px"
                >
                  Look no further, to bring out your sensuality with this uniquely designed brassiere. It comes with push-up cups supported with foam in a soft fabric, gorgeously seamless and will enhance cleavage to give them perfect shape. Underwired and front open hooks, this lace trimmed bra is super comfortable, giving you the right oomph. The stylized racer back with embrodiered lace adds to your charming personality. Own your Passion Back brassiere today.
                </Text>

              </VStack>

            </VStack>

          </Box>

        </Grid>
      </Box>



      <Box w='full' p={"50px 30px"} >
        <Text textAlign="left" my={8} fontWeight={"bold"} color="#282c3f">SIMILAR PRODUCTS</Text>
        <SimpleGrid
          columns={5}
          spacingX='40px'
          spacingY='30px'
          w='100%'
        >
          {Array.apply(0, Array(5)).map(function (x, i) {
            return <SimilarProduct key={i} />;
          })}
        </SimpleGrid>
      </Box>

 

      <Box w='full' p={"50px 30px"} >
        <HStack>
          <Text textAlign="left" my={8} fontWeight={"bold"} color="#282c3f">REVIEWS</Text>

          <Spacer />

          <Button onClick={onOpen}>Add Review</Button>

          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Your Review</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={10}>
                  <Input placeholder='Write Review' />
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
                          onClick={() => handleClick(value)}
                          colorScheme={value <= rating ? "green" : "gray"}
                        />
                      );
                    })}
                  </HStack>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Submit</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </HStack>

        <SingleReview />
      </Box> </>: <p>Loading....</p>}
    </>
  )
}


export default Product



