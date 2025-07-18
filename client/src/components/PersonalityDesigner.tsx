'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Brain, MessageCircle, Sparkles, Target, RefreshCw, Save } from 'lucide-react'

interface PersonalityTrait {
  id: string
  name: string
  description: string
  value: number
  min: number
  max: number
  examples: {
    low: string
    high: string
  }
}

interface BotPersonality {
  name: string
  description: string
  traits: PersonalityTrait[]
  sampleMessages: string[]
}

const personalityTraits: PersonalityTrait[] = [
  {
    id: 'friendliness',
    name: 'Friendliness',
    description: 'How warm and approachable your bot sounds',
    value: 75,
    min: 0,
    max: 100,
    examples: {
      low: 'Product available. Purchase here.',
      high: 'Hey there! 😊 I think you\'ll love this product - check it out!'
    }
  },
  {
    id: 'professionalism',
    name: 'Professionalism',
    description: 'Level of formal business communication',
    value: 60,
    min: 0,
    max: 100,
    examples: {
      low: 'This stuff is amazing, you gotta try it!',
      high: 'We are pleased to present this premium solution for your consideration.'
    }
  },
  {
    id: 'enthusiasm',
    name: 'Enthusiasm',
    description: 'Energy and excitement level in messaging',
    value: 80,
    min: 0,
    max: 100,
    examples: {
      low: 'New product available.',
      high: 'OMG! You won\'t believe this AMAZING new arrival! 🔥🔥🔥'
    }
  },
  {
    id: 'helpfulness',
    name: 'Helpfulness',
    description: 'How much assistance and guidance to provide',
    value: 85,
    min: 0,
    max: 100,
    examples: {
      low: 'Available in store.',
      high: 'Let me help you find the perfect size and color - I\'ll guide you through everything!'
    }
  },
  {
    id: 'urgency',
    name: 'Sales Urgency',
    description: 'How much pressure to create for purchases',
    value: 40,
    min: 0,
    max: 100,
    examples: {
      low: 'Available when you\'re ready.',
      high: 'ONLY 3 LEFT! LIMITED TIME OFFER - DON\'T MISS OUT!'
    }
  },
  {
    id: 'personalization',
    name: 'Personalization',
    description: 'How tailored responses are to individual users',
    value: 70,
    min: 0,
    max: 100,
    examples: {
      low: 'Thanks for your interest.',
      high: 'Hi Sarah! Based on your love for sustainable fashion, this eco-friendly collection is perfect for you!'
    }
  }
]

const presetPersonalities = [
  {
    name: 'Sales Powerhouse',
    description: 'High-energy, results-focused bot that drives conversions',
    traits: [
      { id: 'friendliness', value: 60 },
      { id: 'professionalism', value: 70 },
      { id: 'enthusiasm', value: 90 },
      { id: 'helpfulness', value: 75 },
      { id: 'urgency', value: 85 },
      { id: 'personalization', value: 80 }
    ]
  },
  {
    name: 'Helpful Assistant',
    description: 'Supportive, informative bot focused on customer service',
    traits: [
      { id: 'friendliness', value: 85 },
      { id: 'professionalism', value: 80 },
      { id: 'enthusiasm', value: 60 },
      { id: 'helpfulness', value: 95 },
      { id: 'urgency', value: 20 },
      { id: 'personalization', value: 75 }
    ]
  },
  {
    name: 'Professional Consultant',
    description: 'Formal, expert-level communication for B2B interactions',
    traits: [
      { id: 'friendliness', value: 40 },
      { id: 'professionalism', value: 95 },
      { id: 'enthusiasm', value: 30 },
      { id: 'helpfulness', value: 85 },
      { id: 'urgency', value: 50 },
      { id: 'personalization', value: 60 }
    ]
  }
]

export default function PersonalityDesigner() {
  const [currentTraits, setCurrentTraits] = useState<PersonalityTrait[]>(personalityTraits)
  const [previewMessage, setPreviewMessage] = useState('')
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false)

  const updateTrait = (traitId: string, newValue: number) => {
    setCurrentTraits(currentTraits.map(trait => 
      trait.id === traitId ? { ...trait, value: newValue } : trait
    ))
  }

  const applyPreset = (preset: any) => {
    const updatedTraits = currentTraits.map(trait => {
      const presetTrait = preset.traits.find((p: any) => p.id === trait.id)
      return presetTrait ? { ...trait, value: presetTrait.value } : trait
    })
    setCurrentTraits(updatedTraits)
  }

  const generatePreview = async () => {
    setIsGeneratingPreview(true)
    // Simulate AI generation based on personality traits
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const friendliness = currentTraits.find(t => t.id === 'friendliness')?.value || 50
    const professionalism = currentTraits.find(t => t.id === 'professionalism')?.value || 50
    const enthusiasm = currentTraits.find(t => t.id === 'enthusiasm')?.value || 50
    
    let message = ''
    
    if (friendliness > 70) {
      message += 'Hey there! 😊 '
    } else if (friendliness > 40) {
      message += 'Hello! '
    } else {
      message += 'Good day. '
    }
    
    if (enthusiasm > 80) {
      message += 'I\'m SO excited to show you this AMAZING new collection! 🔥'
    } else if (enthusiasm > 50) {
      message += 'I\'d love to show you our new collection!'
    } else {
      message += 'Our new collection is now available.'
    }
    
    if (professionalism > 70) {
      message += ' These carefully curated items represent the finest quality in their category.'
    } else {
      message += ' These pieces are absolutely gorgeous and perfect for any occasion!'
    }
    
    setPreviewMessage(message)
    setIsGeneratingPreview(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">Bot Personality Designer</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Craft the perfect personality for your bot. Adjust traits to match your brand voice 
          and see real-time previews of how your bot will communicate.
        </p>
      </div>

      <Tabs defaultValue="designer" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-stone-900 border-stone-700 max-w-md mx-auto">
          <TabsTrigger value="designer" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
            Designer
          </TabsTrigger>
          <TabsTrigger value="presets" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
            Presets
          </TabsTrigger>
          <TabsTrigger value="preview" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="designer" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personality Sliders */}
            <div className="space-y-6">
              {currentTraits.map((trait) => (
                <Card key={trait.id} className="bg-stone-900 border-stone-700">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{trait.name}</CardTitle>
                      <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                        {trait.value}%
                      </Badge>
                    </div>
                    <CardDescription className="text-gray-400">
                      {trait.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Slider
                      value={[trait.value]}
                      onValueChange={(value) => updateTrait(trait.id, value[0])}
                      max={trait.max}
                      min={trait.min}
                      step={5}
                      className="w-full"
                    />
                    <div className="grid grid-cols-1 gap-3 text-sm">
                      <div className="bg-stone-800 rounded p-3">
                        <Label className="text-yellow-400 text-xs">LOW EXAMPLE:</Label>
                        <p className="text-gray-300 mt-1">{trait.examples.low}</p>
                      </div>
                      <div className="bg-stone-800 rounded p-3">
                        <Label className="text-yellow-400 text-xs">HIGH EXAMPLE:</Label>
                        <p className="text-gray-300 mt-1">{trait.examples.high}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Live Preview */}
            <div className="space-y-6">
              <Card className="bg-stone-900 border-stone-700 sticky top-6">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2 text-yellow-400" />
                    Live Message Preview
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    See how your bot will communicate with these personality settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={generatePreview}
                    disabled={isGeneratingPreview}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
                  >
                    {isGeneratingPreview ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Preview
                      </>
                    )}
                  </Button>
                  
                  {previewMessage && (
                    <div className="bg-stone-800 rounded-lg p-4 border border-yellow-400/20">
                      <Label className="text-yellow-400 text-sm">Bot Message:</Label>
                      <p className="text-white mt-2 leading-relaxed">{previewMessage}</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <Label className="text-white">Personality Summary:</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {currentTraits.map((trait) => (
                        <div key={trait.id} className="bg-stone-800 rounded p-2 text-center">
                          <div className="text-xs text-gray-400">{trait.name}</div>
                          <div className="text-sm font-semibold text-yellow-400">{trait.value}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="presets" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {presetPersonalities.map((preset, index) => (
              <Card key={index} className="bg-stone-900 border-stone-700 hover:border-yellow-400/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-white">{preset.name}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {preset.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {preset.traits.map((trait) => {
                      const traitInfo = personalityTraits.find(t => t.id === trait.id)
                      return (
                        <div key={trait.id} className="flex items-center justify-between text-sm">
                          <span className="text-gray-300">{traitInfo?.name}</span>
                          <span className="text-yellow-400 font-medium">{trait.value}%</span>
                        </div>
                      )
                    })}
                  </div>
                  <Button 
                    onClick={() => applyPreset(preset)}
                    className="w-full bg-stone-700 hover:bg-stone-600 text-white"
                  >
                    Apply Preset
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card className="bg-stone-900 border-stone-700">
            <CardHeader>
              <CardTitle className="text-white">Conversation Preview</CardTitle>
              <CardDescription className="text-gray-400">
                See how your bot handles different scenarios with the current personality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-stone-800 rounded-lg p-4">
                  <div className="text-center py-12">
                    <Brain className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      Interactive Preview Coming Soon
                    </h3>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                      Chat with your bot in different scenarios to test personality settings. 
                      See how it handles customer inquiries, product questions, and sales situations.
                    </p>
                    <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
                      Get Early Access
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-center pt-6">
        <Button className="bg-yellow-400 hover:bg-yellow-500 text-black px-8">
          <Save className="w-4 h-4 mr-2" />
          Save Personality Settings
        </Button>
      </div>
    </div>
  )
}