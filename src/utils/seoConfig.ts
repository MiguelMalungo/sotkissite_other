export interface PageSEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  structuredData?: object;
}

export const seoConfig: Record<string, PageSEO> = {
  home: {
    title: 'Sistemas Inteligentes de Gestão de Resíduos | Cidades Inteligentes',
    description: 'Sotkis oferece sistemas inteligentes para gestão de resíduos em cidades inteligentes. Sensores IoT, contentores enterrados, controlo de acesso e reciclagem sustentável.',
    keywords: [
      'sistemas inteligentes',
      'intelligent systems',
      'cidades inteligentes',
      'smart cities',
      'gestão de resíduos',
      'waste management system',
      'sensor',
      'sensores',
      'controlos de acesso',
      'access controls',
      'Sotkis',
      'Sotkon',
      'contentores enterrados de resíduos',
      'underground waste containers',
      'ambiente',
      'environment',
      'reciclagem',
      'recycling',
      'resíduos',
      'waste',
      'lixo',
      'sustentabilidade',
      'sustainability'
    ],
    ogImage: '/Hero1.webp',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Sotkis - Sotkon Intelligent Systems',
      'url': 'https://miguelmalungo.github.io/sotkissite_other',
      'logo': 'https://miguelmalungo.github.io/sotkissite_other/assets/logotipo-sotkon-neg-preto.webp',
      'description': 'Sistemas inteligentes para gestão de resíduos em cidades inteligentes',
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': 'PT'
      },
      'sameAs': [],
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'Customer Service',
        'availableLanguage': ['Portuguese', 'English']
      },
      'offers': {
        '@type': 'AggregateOffer',
        'availability': 'https://schema.org/InStock',
        'itemOffered': [
          {
            '@type': 'Product',
            'name': 'Sotkis Access',
            'description': 'Sistema de controlo de acesso para contentores de resíduos'
          },
          {
            '@type': 'Product',
            'name': 'Sotkis Level',
            'description': 'Sistema de monitorização de nível de enchimento com sensores'
          },
          {
            '@type': 'Product',
            'name': 'Sotkis DRS',
            'description': 'Sistema de retorno digital para reciclagem'
          },
          {
            '@type': 'Product',
            'name': 'Sotkis P(L)AYT',
            'description': 'Sistema PAYT de gestão e tarifação de resíduos'
          }
        ]
      }
    }
  },
  access: {
    title: 'Controlos de Acesso PAYT | Sotkis Access',
    description: 'Sistema inteligente de controlo de acesso para contentores de resíduos. Solução PAYT (Pay-As-You-Throw) com sensores IoT para cidades inteligentes e gestão sustentável.',
    keywords: [
      'controlos de acesso',
      'access controls',
      'PAYT',
      'pay-as-you-throw',
      'Sotkis Access',
      'sistemas inteligentes',
      'intelligent systems',
      'gestão de resíduos',
      'waste management',
      'contentores enterrados',
      'underground containers',
      'sensor',
      'sensores',
      'cidades inteligentes',
      'smart cities',
      'tarifação resíduos',
      'reciclagem',
      'recycling',
      'Sotkon'
    ],
    ogImage: '/assets/ACCESS.webp',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': 'Sotkis Access',
      'description': 'Sistema de controlo de acesso para contentores de resíduos com tecnologia PAYT',
      'brand': {
        '@type': 'Brand',
        'name': 'Sotkis - Sotkon Group'
      },
      'category': 'Waste Management Systems',
      'offers': {
        '@type': 'Offer',
        'availability': 'https://schema.org/InStock',
        'priceCurrency': 'EUR'
      }
    }
  },
  level: {
    title: 'Sensores de Monitorização | Sotkis Level',
    description: 'Sensores ultrassónicos inteligentes para monitorização do nível de enchimento de contentores de resíduos. Otimize rotas de recolha e reduza custos operacionais.',
    keywords: [
      'sensor',
      'sensores',
      'Sotkis Level',
      'monitorização',
      'monitoring',
      'sistemas inteligentes',
      'intelligent systems',
      'nível de enchimento',
      'fill level',
      'gestão de resíduos',
      'waste management',
      'contentores enterrados',
      'underground waste containers',
      'cidades inteligentes',
      'smart cities',
      'IoT',
      'sensor ultrassónico',
      'ultrasonic sensor',
      'otimização rotas',
      'route optimization',
      'Sotkon',
      'ambiente',
      'environment'
    ],
    ogImage: '/assets/levelphoto.webp',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': 'Sotkis Level',
      'description': 'Sistema de monitorização inteligente com sensores ultrassónicos para gestão de resíduos',
      'brand': {
        '@type': 'Brand',
        'name': 'Sotkis - Sotkon Group'
      },
      'category': 'IoT Sensors for Waste Management',
      'offers': {
        '@type': 'Offer',
        'availability': 'https://schema.org/InStock',
        'priceCurrency': 'EUR'
      }
    }
  },
  drs: {
    title: 'Sistema de Retorno Digital DRS | Reciclagem Inteligente',
    description: 'Sistema Digital de Retorno (DRS) para aumentar taxas de reciclagem. Identifica embalagens individuais e atribui incentivos aos utilizadores em cidades inteligentes.',
    keywords: [
      'DRS',
      'Digital Return System',
      'sistema de retorno',
      'reciclagem',
      'recycling',
      'Sotkis DRS',
      'sistemas inteligentes',
      'intelligent systems',
      'resíduos',
      'waste',
      'ambiente',
      'environment',
      'cidades inteligentes',
      'smart cities',
      'gestão de resíduos',
      'waste management',
      'incentivos reciclagem',
      'contentores enterrados',
      'underground containers',
      'sensor',
      'Sotkon',
      'sustentabilidade',
      'sustainability'
    ],
    ogImage: '/assets/DRS.webp',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': 'Sotkis DRS',
      'description': 'Sistema Digital de Retorno para aumentar taxas de reciclagem com identificação de embalagens',
      'brand': {
        '@type': 'Brand',
        'name': 'Sotkis - Sotkon Group'
      },
      'category': 'Digital Return Systems',
      'offers': {
        '@type': 'Offer',
        'availability': 'https://schema.org/InStock',
        'priceCurrency': 'EUR'
      }
    }
  },
  paylt: {
    title: 'Sistema PAYT P(L)AYT | Gestão Inteligente de Resíduos',
    description: 'Ecossistema P(L)AYT (Pay-Less-As-You-Throw) com IA, gamificação e recompensas. Sistema inteligente de tarifação de resíduos para cidades sustentáveis.',
    keywords: [
      'PAYT',
      'PLAYT',
      'pay-as-you-throw',
      'pay-less-as-you-throw',
      'Sotkis PLAYT',
      'sistemas inteligentes',
      'intelligent systems',
      'gestão de resíduos',
      'waste management system',
      'tarifação resíduos',
      'waste pricing',
      'gamificação',
      'gamification',
      'reciclagem',
      'recycling',
      'cidades inteligentes',
      'smart cities',
      'inteligência artificial',
      'AI',
      'sensor',
      'contentores enterrados',
      'underground waste containers',
      'ambiente',
      'environment',
      'Sotkon',
      'economia circular',
      'circular economy'
    ],
    ogImage: '/assets/payltsystems.webp',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': 'Sotkis P(L)AYT',
      'description': 'Sistema integrado PAYT com IA, hardware e software para gestão sustentável de resíduos',
      'brand': {
        '@type': 'Brand',
        'name': 'Sotkis - Sotkon Group'
      },
      'category': 'Waste Management Systems',
      'offers': {
        '@type': 'Offer',
        'availability': 'https://schema.org/InStock',
        'priceCurrency': 'EUR'
      }
    }
  },
  platform: {
    title: 'Plataforma Digital Sotkis | Software de Gestão de Resíduos',
    description: 'Plataforma digital gratuita Sotkis para gestão inteligente de contentores enterrados. Sistema integrado com sensores IoT para cidades inteligentes e reciclagem.',
    keywords: [
      'plataforma Sotkis',
      'Sotkis platform',
      'software gestão resíduos',
      'waste management software',
      'sistemas inteligentes',
      'intelligent systems',
      'cidades inteligentes',
      'smart cities',
      'gestão de resíduos',
      'waste management system',
      'contentores enterrados',
      'underground waste containers',
      'sensor',
      'monitorização',
      'monitoring',
      'IoT',
      'reciclagem',
      'recycling',
      'Sotkon',
      'ambiente',
      'environment'
    ],
    ogImage: '/assets/1.webp',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'Sotkis Platform',
      'applicationCategory': 'BusinessApplication',
      'description': 'Plataforma digital para gestão inteligente de sistemas de resíduos',
      'operatingSystem': 'Web, iOS, Android',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'EUR'
      }
    }
  },
  contact: {
    title: 'Contacto | Soluções para Cidades Inteligentes',
    description: 'Entre em contacto com a Sotkis para soluções inteligentes de gestão de resíduos. Sistemas com sensores IoT para cidades sustentáveis e contentores enterrados.',
    keywords: [
      'contacto Sotkis',
      'contact Sotkis',
      'sistemas inteligentes',
      'intelligent systems',
      'cidades inteligentes',
      'smart cities',
      'gestão de resíduos',
      'waste management',
      'Sotkon',
      'sensor',
      'reciclagem',
      'recycling',
      'contentores enterrados',
      'underground containers',
      'ambiente',
      'environment'
    ],
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      'name': 'Contact Sotkis',
      'description': 'Página de contacto para soluções de gestão de resíduos',
      'url': 'https://miguelmalungo.github.io/sotkissite_other/contact'
    }
  },
  trash4goods: {
    title: 'Trash4Goods | App de Reciclagem para Cidadãos',
    description: 'Trash4Goods é a app cidadã da Sotkis para reciclagem inteligente. Encontre pontos de recolha, participe no DRS e ganhe recompensas pela sua reciclagem.',
    keywords: [
      'Trash4Goods',
      'app reciclagem',
      'recycling app',
      'app cidadão',
      'citizen app',
      'reciclagem',
      'recycling',
      'recompensas reciclagem',
      'recycling rewards',
      'DRS',
      'Digital Return System',
      'Sotkis',
      'Sotkon',
      'cidades inteligentes',
      'smart cities',
      'gestão de resíduos',
      'waste management',
      'sustentabilidade',
      'sustainability',
      'economia circular',
      'circular economy',
      'gamificação',
      'gamification'
    ],
    ogImage: '/assets/SFS06451.webp',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'MobileApplication',
      'name': 'Trash4Goods',
      'applicationCategory': 'UtilitiesApplication',
      'description': 'Aplicação móvel para cidadãos participarem na reciclagem inteligente com recompensas',
      'operatingSystem': 'iOS, Android',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'EUR'
      }
    }
  },
  'mobile-app': {
    title: 'App Mobile Sotkis | Gestão de Resíduos Mobile',
    description: 'Aplição mobile Sotkis para gestão inteligente de resíduos. Monitorize contentores, gerir operações e aceder a dados em tempo real a partir do seu smartphone.',
    keywords: [
      'app mobile Sotkis',
      'Sotkis mobile app',
      'gestão resíduos mobile',
      'waste management app',
      'monitorização mobile',
      'mobile monitoring',
      'IoT',
      'sistemas inteligentes',
      'intelligent systems',
      'cidades inteligentes',
      'smart cities',
      'Sotkon',
      'contentores enterrados',
      'underground containers'
    ],
    ogImage: '/assets/iPhone-Hand-Mockup.webp',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'MobileApplication',
      'name': 'Sotkis Mobile App',
      'applicationCategory': 'BusinessApplication',
      'description': 'Aplicação mobile para gestão inteligente de sistemas de resíduos',
      'operatingSystem': 'iOS, Android',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'EUR'
      }
    }
  },
  landing: {
    title: 'SOTKIS | Sistemas Inteligentes de Gestão de Resíduos',
    description: 'SOTKIS by Sotkon Intelligent Systems — soluções IoT para gestão inteligente de resíduos em cidades sustentáveis. Aceda à plataforma ou explore os nossos produtos.',
    keywords: [
      'Sotkis',
      'Sotkon',
      'sistemas inteligentes',
      'intelligent systems',
      'gestão de resíduos',
      'waste management',
      'cidades inteligentes',
      'smart cities',
      'IoT',
      'reciclagem',
      'recycling',
      'sustentabilidade',
      'sustainability',
      'contentores enterrados',
      'underground waste containers'
    ],
    ogImage: '/Hero1.webp',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'Sotkis - Sotkon Intelligent Systems',
      'url': 'https://miguelmalungo.github.io/sotkissite_other',
      'description': 'Sistemas inteligentes para gestão de resíduos em cidades inteligentes',
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': 'PT'
      },
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'Customer Service',
        'availableLanguage': ['Portuguese', 'English', 'Spanish', 'French', 'Greek', 'Croatian']
      }
    }
  }
};





