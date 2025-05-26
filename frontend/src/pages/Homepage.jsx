import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react'
import { useProductStore } from '../store/product'
import ProductCard from '../components/ProductCard'

const Homepage = () => {
  const {fetchProducts,products} = useProductStore(); // Assuming fetchProducts is defined somewhere in the context or props
  useEffect(() => {
      fetchProducts();
  }, [fetchProducts]);
  console.log("products",products)
  // This effect can be used to fetch products or perform any side effects when the component mounts
  return (
    <Container maxW='container/xl' py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient='linear(to-r, teal.500, blue.500)'
          bgClip='text'
          textAlign='center'
        >
          Create product 🚀
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"full"}>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text fontSize='xl' fontWeight='bold' color='gray.500' textAlign={"center"}>
            No Product Found 😢{" "}
            <Link to={"/create"}>
              <Text as='span' color='blue.500' _hover={{ textDecoration: 'underline' }}>
                  Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  )
}

export default Homepage