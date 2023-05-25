import { Box, Flex, Heading, Spacer } from "@chakra-ui/react"
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
//import rehypeRaw from "rehype-raw";
//import rehypeSanitize from "rehype-sanitize";

const PageComponent = ({ page }) => {
  return (
    <Box>
      <Flex>
        <Heading as="h1" size="2xl" mb="6">
          {page.title}
        </Heading>
        <Spacer />
        {/**a little cute box with details about metadata */}
        <Box
          bg="gray.100"
          color="gray.700"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
          ml="3"
          px="3"
          py="1"
          borderRadius="md"
          verticalAlign={"center"}
          display={{ base: "none", md: "block" }}
        >
        {page.createdAt}
        </Box>

      </Flex>
      <Box m="6">
        <ReactMarkdown
          components={ChakraUIRenderer()}
          remarkPlugins={[remarkGfm]}
          //remarkToRehypeOptions={{ allowDangerousHtml: true }}
          //rehypePlugins={[rehypeRaw, [rehypeSanitize, {tagNames: ["a", "img", "b", "strong", "em", "detail"]}]]}
          children={page.content}
          skipHtml />
      </Box>
    </Box>
  )
}

export default PageComponent
