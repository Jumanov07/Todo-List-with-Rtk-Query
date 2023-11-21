import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://todo-rtk-2a031-default-rtdb.firebaseio.com",
  }),
  tagTypes: ["Todos"],

  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "/todos.json",
      transformResponse: (res) => {
        if (res !== null) {
          let newData = [];

          for (const key in res) {
            newData.push({
              id: key,
              title: res[key].title,
              completed: res[key].completed,
              userId: res[key].userId,
            });
          }

          return newData.sort((a, b) => b.id - a.id);
        } else {
          return [];
        }
      },
      providesTags: ["Todos"],
    }),

    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/todos.json",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),

    updateTodo: builder.mutation({
      query: (todo) => ({
        url: `/todos/${todo.id}.json`,
        method: "PATCH",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),

    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}.json`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = apiSlice;
