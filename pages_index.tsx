import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Home() {
  const [videoUrl, setVideoUrl] = useState('')
  const [videoInfo, setVideoInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [quality, setQuality] = useState('720p')
  const [activeTab, setActiveTab] = useState('downloader')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setVideoInfo(null)

    try {
      const url = new URL(videoUrl)
      const videoId = url.searchParams.get('v') || url.pathname.split('/').pop()
      if (!videoId) throw new Error('Invalid YouTube URL')

      const response = await fetch(`https://youtube-v31.p.rapidapi.com/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${videoId}`, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'youtube-v31.p.rapidapi.com',
          'x-rapidapi-key': 'd1c53133acmsh2e7c470c0bfbb2ep1a074cjsne9dd522da151'
        }
      })

      if (!response.ok) throw new Error('Failed to fetch video information')

      const data = await response.json()
      if (data.items && data.items.length > 0) {
        setVideoInfo(data.items[0])
      } else {
        throw new Error('Video not found')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    alert(`Download started! (${activeTab} - This is a simulation)`)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex flex-wrap justify-between items-center">
            <div className="text-2xl font-bold text-blue-400 mb-2 sm:mb-0">yt1d.com</div>
            <Select defaultValue="English">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Français">Français</SelectItem>
                <SelectItem value="Español">Español</SelectItem>
                <SelectItem value="Deutsch">Deutsch</SelectItem>
                <SelectItem value="Italiano">Italiano</SelectItem>
              </SelectContent>
            </Select>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="downloader" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="downloader">Youtube Downloader</TabsTrigger>
            <TabsTrigger value="mp3">Youtube To Mp3</TabsTrigger>
            <TabsTrigger value="mp4">Youtube To Mp4</TabsTrigger>
            <TabsTrigger value="shorts">YouTube Shorts Downloader</TabsTrigger>
            <TabsTrigger value="copyright">Copyright</TabsTrigger>
          </TabsList>
          <TabsContent value="downloader">
            <div className="bg-blue-50 rounded-lg shadow-sm p-8">
              <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">YouTube Video Downloader</h1>
              <p className="text-center text-gray-600 mb-8">Download online videos in MP4 format</p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-2xl mx-auto">
                <Input 
                  type="text" 
                  placeholder="Paste YouTube video link here" 
                  className="flex-grow mb-2 sm:mb-0 sm:mr-2"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
                <Button type="submit" className="bg-blue-400 hover:bg-blue-500 text-white" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Search'}
                </Button>
              </form>
            </div>
          </TabsContent>
          <TabsContent value="mp3">
            <div className="bg-blue-50 rounded-lg shadow-sm p-8">
              <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">YouTube to MP3 Converter</h1>
              <p className="text-center text-gray-600 mb-8">Convert and download YouTube videos to MP3 format</p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-2xl mx-auto">
                <Input 
                  type="text" 
                  placeholder="Paste YouTube video link here" 
                  className="flex-grow mb-2 sm:mb-0 sm:mr-2"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
                <Button type="submit" className="bg-blue-400 hover:bg-blue-500 text-white" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Convert'}
                </Button>
              </form>
            </div>
          </TabsContent>
          <TabsContent value="mp4">
            <div className="bg-blue-50 rounded-lg shadow-sm p-8">
              <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">YouTube to MP4 Converter</h1>
              <p className="text-center text-gray-600 mb-8">Convert and download YouTube videos to MP4 format</p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-2xl mx-auto">
                <Input 
                  type="text" 
                  placeholder="Paste YouTube video link here" 
                  className="flex-grow mb-2 sm:mb-0 sm:mr-2"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
                <Button type="submit" className="bg-blue-400 hover:bg-blue-500 text-white" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Convert'}
                </Button>
              </form>
            </div>
          </TabsContent>
          <TabsContent value="shorts">
            <div className="bg-blue-50 rounded-lg shadow-sm p-8">
              <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">YouTube Shorts Downloader</h1>
              <p className="text-center text-gray-600 mb-8">Download YouTube Shorts videos</p>
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-2xl mx-auto">
                <Input 
                  type="text" 
                  placeholder="Paste YouTube Shorts link here" 
                  className="flex-grow mb-2 sm:mb-0 sm:mr-2"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
                <Button type="submit" className="bg-blue-400 hover:bg-blue-500 text-white" disabled={isLoading}>
                  {isLoading ? 'Loading...' : 'Download'}
                </Button>
              </form>
            </div>
          </TabsContent>
          <TabsContent value="copyright">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Copyright Policy</h1>
              <div className="prose max-w-none">
                <p>
                  Our YouTube video downloader service is designed for personal, non-commercial use only. We respect the intellectual property rights of others and expect our users to do the same.
                </p>
                <h2>Fair Use</h2>
                <p>
                  The concept of fair use allows limited use of copyrighted material without permission for purposes such as commentary, criticism, parody, news reporting, teaching, scholarship, or research.
                </p>
                <h2>User Responsibility</h2>
                <p>
                  Users of our service are responsible for ensuring that their use of downloaded content complies with applicable copyright laws and YouTube's terms of service.
                </p>
                <h2>Copyright Infringement</h2>
                <p>
                  We do not condone copyright infringement. If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, please contact us with the necessary information.
                </p>
                <h2>Disclaimer</h2>
                <p>
                  This service is provided "as is" without any representations or warranties, express or implied. We make no representations or warranties in relation to this service or the information and materials provided on this service.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {videoInfo && activeTab !== 'copyright' && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">{videoInfo.snippet.title}</h2>
            <p className="mb-4">{videoInfo.snippet.description}</p>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-4 sm:mb-0">
                <p>Views: {videoInfo.statistics.viewCount}</p>
                <p>Likes: {videoInfo.statistics.likeCount}</p>
                {activeTab === 'mp4' && (
                  <Select value={quality} onValueChange={setQuality}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="360p">360p</SelectItem>
                      <SelectItem value="480p">480p</SelectItem>
                      <SelectItem value="720p">720p</SelectItem>
                      <SelectItem value="1080p">1080p</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
              <Button onClick={handleDownload} className="bg-green-500 hover:bg-green-600 text-white">
                Download {activeTab === 'mp3' ? 'MP3' : activeTab === 'mp4' ? `MP4 (${quality})` : activeTab === 'shorts' ? 'Short' : 'Video'}
              </Button>
            </div>
          </div>
        )}
      </main>
      <footer className="bg-white shadow mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-500">
          <p>&copy; 2024 yt1d.com. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}