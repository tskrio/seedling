import { Flex, Skeleton, Spacer, Stack } from '@chakra-ui/react'

const TableSkeleton = () => {
  return (
    <Stack>
      <Skeleton height={10} width={'25%'} />
      <Flex>
        <Skeleton height={8} width={'15%'} />
        <Spacer />
        <Skeleton height={8} width={'15%'} />
      </Flex>
      <Skeleton height={8} />
      <Skeleton height={20} />
    </Stack>
  )
}

export default TableSkeleton
