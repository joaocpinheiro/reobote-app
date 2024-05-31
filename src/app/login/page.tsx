import { FormSignIn } from './formSignIn'

export default async function SignIn() {
  return (
    <>
      <div className="flex items-center justify-center p-8">
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="pb-3 text-2xl font-semibold tracking-tight text-white">
              Fazer Login
            </h1>
            <FormSignIn />
          </div>
        </div>
      </div>
    </>
  )
}
