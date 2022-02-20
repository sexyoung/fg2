import fs from 'fs';
import path from 'path';

const neighborsDirectory = path.join(process.cwd(), 'neighbors');

export function getSortedNeighborsData() {
  // Get file names under /neighbors
  const fileNames = fs.readdirSync(neighborsDirectory)
  const allNeighborsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.json$/, '')

    // Read markdown file as string
    const fullPath = path.join(neighborsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = JSON.parse(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult
    }
  });
  
  // Sort neighbors by date
  return allNeighborsData.sort((a, b) => {
    if (a.build > b.build) {
      return 1
    } else if (a.build < b.build) {
      return -1
    } else {
      return 0
    }
  })
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
        id: fileName.replace(/\.json$/, '')
      }
    }
  })
}

export async function getNeighborData(id: string) {
  const fullPath = path.join(neighborsDirectory, `${id}.json`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = JSON.parse(fileContents)

  // Use remark to convert markdown into HTML string
  // const processedContent = await remark()
  //   .use(html)
  //   .process(matterResult.content)

  // Combine the data with the id and contentHtml
  return {
    id,
    ...matterResult,
  }
}
