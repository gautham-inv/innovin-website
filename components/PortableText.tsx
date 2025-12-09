/**
 * This component uses Portable Text to render content from Sanity CMS.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 */

import {stegaClean} from '@sanity/client/stega'
import {Image} from 'next-sanity/image'
import {getImageDimensions} from '@sanity/asset-utils'
import {PortableText, type PortableTextComponents, type PortableTextBlock} from 'next-sanity'

import {urlForImage} from '@/lib/sanity/lib/utils'

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string
  value: PortableTextBlock[]
}) {
  const isJobContent = className?.includes('job-content')
  
  const components: PortableTextComponents = {
    block: {
      h1: ({children}) => {
        const isBlogContent = className?.includes('blog-content');
        return (
          <h1 className={`group relative ${isBlogContent ? 'text-[42px] font-semibold leading-[1.3] mb-6 mt-8 font-["Manrope",sans-serif]' : ''}`}>
            {children}
          </h1>
        )
      },
      h2: ({children}) => {
        const isBlogContent = className?.includes('blog-content');
        return (
          <h2 className={`group relative ${isBlogContent ? 'text-[36px] font-semibold leading-[1.3] mb-5 mt-7 font-["Manrope",sans-serif]' : ''}`}>
            {children}
          </h2>
        )
      },
      normal: ({children}) => {
        // Check if className includes job-specific styling
        if (isJobContent) {
          return <p className="font-normal leading-[60px] text-[20px] text-black">{children}</p>
        }
        if (className?.includes('job-description')) {
          return <p className="font-medium leading-[60px] text-[24px] text-black">{children}</p>
        }
        // Blog content styling - larger, more readable
        if (className?.includes('blog-content')) {
          return <p className="font-normal leading-[1.8] text-[20px] text-black mb-6 font-['Manrope',sans-serif]">{children}</p>
        }
        return <p>{children}</p>
      },
    },
    list: {
      bullet: ({children}) => {
        if (isJobContent) {
          return (
            <ul className="list-disc pl-6 space-y-0">
              {children}
            </ul>
          )
        }
        return <ul>{children}</ul>
      },
      number: ({children}) => {
        if (isJobContent) {
          return (
            <ol className="list-decimal pl-6 space-y-0">
              {children}
            </ol>
          )
        }
        return <ol>{children}</ol>
      },
    },
    listItem: {
      bullet: ({children}) => {
        if (isJobContent) {
          return (
            <li className="mb-0">
              <span className="font-normal leading-[60px] text-[20px] text-black">{children}</span>
            </li>
          )
        }
        return <li>{children}</li>
      },
      number: ({children}) => {
        if (isJobContent) {
          return (
            <li className="mb-0">
              <span className="font-normal leading-[60px] text-[20px] text-black">{children}</span>
            </li>
          )
        }
        return <li>{children}</li>
      },
    },
    marks: {
      link: ({children, value: link}) => {
        const href = link?.href || '#'
        return <a href={href}>{children}</a>
      },
    },
    types: {
      image: ({value}) => {
        if (!value?.asset?._ref) {
          return null
        }

        const imageUrl = urlForImage(value)
        if (!imageUrl) {
          return null
        }

        const {width, height} = getImageDimensions(value.asset._ref)
        const alt = stegaClean(value?.alt) || ''

        return (
          <figure className="my-8">
            <div className="relative w-full overflow-hidden rounded-lg">
              <Image
                src={imageUrl.url()}
                alt={alt}
                width={width}
                height={height}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
            {value?.caption && (
              <figcaption className="mt-4 text-sm text-center text-gray-600 italic">
                {value.caption}
              </figcaption>
            )}
          </figure>
        )
      },
    },
  }

  return (
    <div className={['prose prose-a:text-brand', className].filter(Boolean).join(' ')}>
      <PortableText components={components} value={value} />
    </div>
  )
}

