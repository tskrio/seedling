import { Skeleton, Stack } from '@chakra-ui/react'

const FormSkeleton = () => {
  return (
    <Stack>
      <Skeleton height={6} width={'15%'} />
      <Skeleton height={8} />
      <Skeleton height={6} width={'15%'} />
      <Skeleton height={8} />
      <Skeleton height={6} width={'15%'} />
      <Skeleton height={8} pb={2} />
      <Skeleton height={12} width={'10%'} mb={2} />
    </Stack>
  )
}

export default FormSkeleton
