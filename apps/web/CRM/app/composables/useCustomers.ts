import type {CreateCustomerInput, Customer, UpdateCustomerInput} from "~/schemas/customer.validation";

const useCustomers = () => {
  const api = useApi()

  const createCustomer = async (data: CreateCustomerInput) => {
    return await api('/customers', {
      method: 'POST',
      body: data
    })
  }

  const getCustomers = async () => {
    return await api<Customer[]>('/customers', {
      method: 'GET'
    })
  }

  const getCustomer = async (id: number) => {
    return await api(`/customers/${id}`, {
      method: 'GET'
    })
  }

  const updateCustomer = async (data: UpdateCustomerInput, id: number) => {
    return await api(`/customers/${id}`, {
      method: 'PATCH',
      body: data
    })
  }

  const deleteCustomer = async (id: number) => {
    return await api(`/customers/${id}`, {
      method: 'DELETE'
    })
  }

  return { createCustomer, getCustomers, getCustomer, updateCustomer, deleteCustomer }
}

export const useCustomersQuery = () => {
  const { getCustomers, createCustomer } = useCustomers()
  const queryClient = useQueryClient()

  const customersQuery = useQuery({
    queryKey: ['customers'],
    queryFn: getCustomers,
    initialData: []
  })

  const createCustomerMutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ 'customers' ] })
    }
  })

  return { customersQuery, createCustomerMutation }
}
