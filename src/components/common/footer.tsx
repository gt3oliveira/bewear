import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'

export const Footer = () => {
  return (
    <div className="mt-16 flex items-center justify-between bg-[#f9f9f9] px-8 py-5">
      <div>
        <p className="font-semibold">
          © {new Date().getFullYear()} Copyright | BEWEAR
        </p>
        <p className="text-muted-foreground font-semibold">
          Todos os direitos reservados
        </p>
      </div>
      <div className="flex items-center gap-3">
        <FaWhatsapp
          size={24}
          className="hover:cursor-pointer hover:text-green-500 hover:transition-colors"
        />
        <FaInstagram
          size={24}
          className="hover:cursor-pointer hover:text-violet-500 hover:transition-colors"
        />
        <FaFacebook
          size={24}
          className="hover:cursor-pointer hover:text-blue-500 hover:transition-colors"
        />
      </div>
    </div>
  )
}
