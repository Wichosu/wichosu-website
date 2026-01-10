import * as React from 'react'
import { NavbarListItem } from './NavbarListItem'
import { NavbarContent } from './NavbarContent'
import { NavbarTrigger } from './NavbarTrigger'
import { NavbarItem } from './NavbarItem'
import { NavbarList } from './NavbarList'
import { NavbarRoot } from './NavbarRoot'
import { NavbarIndicator } from './NavbarIndicator'
import { NavbarViewport } from './NavbarViewport'
import { NavbarLink } from './NavbarLink'

type NavItem =
  | {
      type: 'trigger'
      trigger: string
      content: NavContent[]
    }
  | {
      type: 'link'
      href: string
      title: string
    }

type NavContent = {
  href: string
  title: string
  description: string
}

// function createNavItem(href: string, title: string): NavItem {
//   return {
//     type: 'link',
//     href,
//     title,
//   };
// }

function createNavItemWithContent(trigger: string, content: NavContent[]): NavItem {
  return {
    type: 'trigger',
    trigger,
    content,
  }
}

function createNavContent(href: string, title: string, description: string): NavContent {
  return {
    href,
    title,
    description,
  }
}

export function Navbar() {
  const NavbarItems: NavItem[] = [
    createNavItemWithContent('Hsk', [
      createNavContent('/libros-hsk', 'HskBooks', 'Descriptions.HskBooks'),
      createNavContent('/hsk-audios', 'HskAudios', 'Descriptions.HskAudios'),
      createNavContent(
        '/hsk-audios-download',
        'HskAudiosDownload',
        'Descriptions.HskAudiosDownload',
      ),
      createNavContent('/hsk-mock-test', 'HskMockTest', 'Descriptions.HskMockTest'),
      createNavContent('/mazos-anki', 'AnkiDecks', 'Descriptions.AnkiDecks'),
    ]),
    createNavItemWithContent('Tools', [
      createNavContent('/canales', 'Channels', 'Descriptions.Channels'),
      createNavContent('/hanzi', 'Hanzi', 'Descriptions.Hanzi'),
      createNavContent('/plantillas', 'Templates', 'Descriptions.Templates'),
      createNavContent(
        '/plantillas/generador',
        'TemplateGenerator',
        'Descriptions.TemplateGenerator',
      ),
    ]),
    createNavItemWithContent('About', [
      createNavContent('/about', 'About', 'Descriptions.About'),
      createNavContent('/roadmap', 'Roadmap', 'Descriptions.Roadmap'),
      createNavContent('/support', 'Support', 'Descriptions.Support'),
    ]),
  ]

  return (
    <NavbarRoot>
      <NavbarList>
        <NavbarItem>
          <NavbarLink href="/">
            <picture className="w-5">
              <img src="/logo.svg" alt="Logo" />
            </picture>
          </NavbarLink>
        </NavbarItem>
        {NavbarItems.map((item, index) => (
          <NavbarItem key={`navitem-${index}`}>
            {item.type === 'link' && <NavbarLink href={item.href}>{item.title}</NavbarLink>}
            {item.type === 'trigger' && (
              <>
                <NavbarTrigger>{item.trigger}</NavbarTrigger>
                <NavbarContent>
                  {item.content.map((listItem, index) => (
                    <NavbarListItem
                      key={`navlistitem-${index}`}
                      href={listItem.href}
                      title={listItem.title}
                    >
                      {listItem.description}
                    </NavbarListItem>
                  ))}
                </NavbarContent>
              </>
            )}
          </NavbarItem>
        ))}
        <NavbarIndicator />
      </NavbarList>
      <NavbarViewport />
    </NavbarRoot>
  )
}
