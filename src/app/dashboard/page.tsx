'use client'
import { getDashboard } from '@/api/get-dashboard'
import { useEffect, useState } from 'react'
import { IoIosLogOut } from 'react-icons/io'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export interface User {
  id: number
  name: string
  email: string
  email_verified_at: string
  created_at: string
  updated_at: string
}

export interface LoggedUser {
  id: number
  name: string
  email: string
  email_verified_at: string
  created_at: string
  updated_at: string
}

export interface Root {
  number_users: number
  logged_user: LoggedUser
  users: User[]
}

const ITEMS_PER_PAGE = 10

const Dashboard = () => {
  const router = useRouter()
  const [data, setData] = useState<Root | undefined>()

  function handleLogout() {
    Cookies.remove('X-CSRF-TOKEN')
    router.push('/login')
  }
  useEffect(() => {
    if (!Cookies.get('X-CSRF-TOKEN')) router.push('/login')

    const fetchData = async () => {
      const dashboardData = await getDashboard()
      setData(dashboardData)
    }

    fetchData()
  }, [])

  function handleDate(date: string) {
    const getDate = new Date(date)
    const day = getDate.getDate()
    const month = getDate.getMonth() + 1
    const year = getDate.getFullYear()

    return `${day}/${month}/${year}`
  }

  const [currentPage, setCurrentPage] = useState(1)

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE

  const currentPageData = data?.users.slice(startIndex, endIndex)

  const maxPage = Math.ceil((data?.users.length || 0) / ITEMS_PER_PAGE)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <section className="space-y-10">
      <button
        onClick={handleLogout}
        className="font- font- ml-auto flex items-center justify-center gap-2 overflow-x-auto bg-red-400 p-2 font-medium shadow-md sm:rounded-lg"
      >
        <IoIosLogOut />
        <p>logout</p>
      </button>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                MEU ID
              </th>
              <th scope="col" className="px-6 py-3">
                MY NAME
              </th>
              <th scope="col" className="px-6 py-3">
                MEU EMAIL
              </th>
              <th scope="col" className="px-6 py-3">
                CRIADO:
              </th>
              <th scope="col" className="px-6 py-3">
                ATUALIZADO:
              </th>
            </tr>
          </thead>
          {data && (
            <tbody>
              <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                <td className="w-4 p-4">{data.logged_user.id}</td>
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {data.logged_user.name}
                </th>
                <td className="px-6 py-4">{data.logged_user.email}</td>
                <td className="px-6 py-4">
                  {handleDate(data.logged_user.created_at)}
                </td>
                <td className="px-6 py-4">
                  {handleDate(data.logged_user.updated_at)}
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                EMAIL
              </th>
              <th scope="col" className="px-6 py-3">
                CRIADO:
              </th>
              <th scope="col" className="px-6 py-3">
                ATUALIZADO:
              </th>
            </tr>
          </thead>

          {currentPageData &&
            currentPageData.map((item) => (
              <tbody key={item.id}>
                <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
                  <td className="w-4 p-4">{item.id}</td>
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {item.name}
                  </th>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{handleDate(item.created_at)}</td>
                  <td className="px-6 py-4">{handleDate(item.updated_at)}</td>
                </tr>
              </tbody>
            ))}
        </table>
        <nav
          className="flex-column flex flex-wrap items-center justify-between pt-4 md:flex-row"
          aria-label="Table navigation"
        >
          <span className="mb-4 block w-full text-sm font-normal text-gray-500 md:mb-0 md:inline md:w-auto dark:text-gray-400">
            Mostrando{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {currentPage}-{maxPage}
            </span>{' '}
            de{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {data?.users.length}
            </span>
          </span>
          <ul className="inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse">
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Anterior
              </button>
            </li>
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {currentPage === 1 ? '' : currentPage - 1}
              </button>
            </li>
            <li>
              <button className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-500 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                {currentPage}
              </button>
            </li>
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === maxPage}
                className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {currentPage === maxPage ? '' : currentPage + 1}
              </button>
            </li>
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === maxPage}
                className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Próxima
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  )
}

export default Dashboard
