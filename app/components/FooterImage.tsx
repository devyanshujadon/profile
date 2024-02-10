import React from 'react'
import Image from 'next/image'
type Props = {}

function FooterImage({}: Props) {
  return (
    <div className=' hidden lg:flex'>
      <Image
      src="/linkedin-dp.jpg"
      width={500}
      height={500}
      alt="Picture of the author"
      className="rounded-full  h-28 w-28 object-cover"
    ></Image>
    </div>
  )
}

export default FooterImage