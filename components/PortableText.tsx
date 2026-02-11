/**
 * This component uses Portable Text to render content from Sanity CMS.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 */

import { stegaClean } from '@sanity/client/stega'
import { Image } from 'next-sanity/image'
import { getImageDimensions } from '@sanity/asset-utils'
import { PortableText, type PortableTextComponents, type PortableTextBlock } from 'next-sanity'

import { urlForImage } from '@/lib/sanity/lib/utils'

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
      h1: ({ children }) => {
        const isBlogContent = className?.includes('blog-content');
        const isJobContent = className?.includes('job-content') || className?.includes('job-description');
        return (
          <h1 className={`group relative font-sans font-semibold leading-tight ${isBlogContent ? 'text-3xl sm:text-4xl mb-6 mt-8' : isJobContent ? 'text-xl sm:text-2xl md:text-3xl mb-4 mt-6' : 'text-2xl sm:text-3xl mb-4 mt-6'}`}>
            {children}
          </h1>
        )
      },
      h2: ({ children }) => {
        const isBlogContent = className?.includes('blog-content');
        const isJobContent = className?.includes('job-content') || className?.includes('job-description');
        return (
          <h2 className={`group relative font-sans font-semibold leading-tight ${isBlogContent ? 'text-2xl sm:text-3xl mb-5 mt-7' : isJobContent ? 'text-lg sm:text-xl md:text-2xl mb-4 mt-6' : 'text-xl sm:text-2xl mb-4 mt-6'}`}>
            {children}
          </h2>
        )
      },
      h3: ({ children }) => {
        return (
          <h3 className="group relative font-sans text-lg sm:text-xl font-semibold leading-tight mb-3 mt-5">
            {children}
          </h3>
        )
      },
      normal: ({ children }) => {
        const isBlogContent = className?.includes('blog-content');
        const isJobDescription = className?.includes('job-description');
        const isJobContent = className?.includes('job-content');

        let textStyles = "font-sans leading-relaxed text-black mb-4";

        if (isBlogContent) {
          textStyles += " text-lg sm:text-xl";
        } else if (isJobDescription || isJobContent) {
          textStyles += " text-base sm:text-lg";
        } else {
          textStyles += " text-base";
        }

        return <p className={textStyles}>{children}</p>
      },
    },
    list: {
      bullet: ({ children }) => {
        if (isJobContent) {
          return (
            <ul className="list-disc pl-6 space-y-1.5">
              {children}
            </ul>
          )
        }
        return <ul>{children}</ul>
      },
      number: ({ children }) => {
        if (isJobContent) {
          return (
            <ol className="list-decimal pl-6 space-y-1.5">
              {children}
            </ol>
          )
        }
        return <ol>{children}</ol>
      },
    },
    listItem: {
      bullet: ({ children }) => {
        const isBlogContent = className?.includes('blog-content');
        const isJobContent = className?.includes('job-content') || className?.includes('job-description');

        let textStyles = "font-sans leading-relaxed text-black";
        if (isBlogContent) {
          textStyles += " text-lg sm:text-xl";
        } else if (isJobContent) {
          textStyles += " text-base sm:text-lg";
        }

        return (
          <li className="mb-2">
            <span className={textStyles}>
              {children}
            </span>
          </li>
        )
      },
      number: ({ children }) => {
        const isBlogContent = className?.includes('blog-content');
        const isJobContent = className?.includes('job-content') || className?.includes('job-description');

        let textStyles = "font-sans leading-relaxed text-black";
        if (isBlogContent) {
          textStyles += " text-lg sm:text-xl";
        } else if (isJobContent) {
          textStyles += " text-base sm:text-lg";
        }

        return (
          <li className="mb-2">
            <span className={textStyles}>
              {children}
            </span>
          </li>
        )
      },
    },
    marks: {
      link: ({ children, value: link }) => {
        const href = link?.href || '#'
        return <a href={href}>{children}</a>
      },
    },
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) {
          return null
        }

        const imageUrl = urlForImage(value)
        if (!imageUrl) {
          return null
        }

        const { width, height } = getImageDimensions(value.asset._ref)
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

