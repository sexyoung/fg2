import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const neighborsDirectory = path.join(process.cwd(), 'neighbors');

export function getSortedNeighborsData() {
  // Get file names under /neighbors
  const fileNames = fs.readdirSync(neighborsDirectory)
  const allNeighborsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(neighborsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  });

  allNeighborsData.sort((a, b) => {
    if (a.id > b.id) {
      return 1
    } else if (a.id < b.id) {
      return -1
    } else {
      return 0
    }
  });

  return [
    ...allNeighborsData.slice(0, -3).reverse(),
    ...allNeighborsData.slice(-3)
  ];
}

export function getAllNeighborIds() {
  const fileNames = fs.readdirSync(neighborsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getNeighborData(id: string) {
  const fullPath = path.join(neighborsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}
