import { Box, Heading, HStack, IconButton, Image, Text, useColorModeValue, useDisclosure, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack, Input, ModalFooter, Button } from '@chakra-ui/react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import React,{ useState } from 'react'
import { useProductStore } from '../store/product';


const ProductCard = ({product}) => {
    const [updatedProduct, setUpdateProduct] = useState(product);
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg= useColorModeValue("white", "gray.800");
    const {updateProduct,deleteProduct} = useProductStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteProduct = async (pid) => {
        const {success,message} = await deleteProduct(pid);
        if(!success) {
            toast({
                title: "Error",
                description: message || "Failed to delete product.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        else {
            toast({
                title: "Success",
                description: message || "Product deleted successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleUpdateProduct = async (pid, updateProduct) => {
        const {success,message} = await updateProduct(pid, updatedProduct);
        onClose();
        if(!success) {
            toast({
                title: "Error",
                description: message || "Failed to update product.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
        else {
            toast({
                title: "Success",
                description: message || "Product updated successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

  return (
    <Box 
        shadow='lg'
        rounded='lg'
        overflow='hidden'
        transition='all 0.3s'
        _hover={{ transform: "translate(-5px)", shadow: 'xl' }}
        bg={bg}
    >
        <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

        <Box p={4}>
        <Heading as='h3' size='md' mb={2}>
            {product.name}
        </Heading>
        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
            ${product.price}
        </Text>

        <HStack spacing={2}>
            <IconButton icon={<FaEdit />} onClick={onOpen} colorScheme='blue' />
            <IconButton icon={<MdDelete />} onClick={() => handleDeleteProduct(product._id)} colorScheme='red' />
        </HStack>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />

                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4} >
                            <Input 
                                placeholder='Product Name'
                                name='name'
                                value={updatedProduct.name}
                                onChange={(e) => setUpdateProduct({ ...updatedProduct, name:e.target.value})}
                            />
                            <Input 
                                placeholder='Price'
                                name='price'
                                type='number'
                                value={updatedProduct.price}
                                onChange={(e) => setUpdateProduct({ ...updatedProduct, price:e.target.value})}
                            />
                            <Input 
                                placeholder='Image URL'
                                name='image'
                                value={updatedProduct.image}
                                onChange={(e) => setUpdateProduct({ ...updatedProduct, image:e.target.value})}
                            />
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product._id, updateProduct)}>
                            Update
                        </Button>
                        <Button variant='ghost' onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>

        </Modal>
    </Box>
  )
}

export default ProductCard