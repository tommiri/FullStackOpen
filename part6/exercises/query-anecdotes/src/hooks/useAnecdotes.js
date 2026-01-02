import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createAnecdote, updateAnecdote } from '../requests'
import { useNotify } from './useNotify'

export const useCreateAnecdote = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()

  return useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      notify(`Created new anecdote: '${newAnecdote.content}'`)
    },
    onError: ({ message }) => {
      notify(`Error: ${message}`, { isError: true })
    },
  })
}

export const useUpdateAnecdote = () => {
  const queryClient = useQueryClient()
  const notify = useNotify()

  return useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecdotes.map((anecdote) =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote,
      )
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
      notify(`You voted for '${updatedAnecdote.content}'`)
    },
  })
}
