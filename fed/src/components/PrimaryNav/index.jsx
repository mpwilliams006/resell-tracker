import React, { useEffect, useState } from 'react';
import data from './data';
import Anchor from '../Anchor'
import { NavLink } from 'react-router-dom'
import Button from '../Button'
import logo from '../../logo.svg';
import Logo from '../Logo';
import { GlobalStateContext } from './../State';

const NavItem = (props) => {

  const [isShown, setIsShown] = useState(false);
  const mouseEvents = { onMouseEnter: () => setIsShown(true), onMouseLeave: () => setIsShown(false) };
  return (
    <div {...mouseEvents} className="hidden lg:inline-block lg:p-2 xl:p-4 relative">
      <div className="flex px-1">
        <NavLink className="py-2 text-base px-2 text-white" to={props.href}>{props.label}</NavLink>
        {props.dropdown && <svg className="fill-current w-2" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d="M10.28 4.305L5.989 8.598 1.695 4.305A1 1 0 00.28 5.72l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z"></path></svg>}
      </div>
      {props.dropdown && isShown && <div className="text-base text-left px-4 absolute w-48 py-3 bg-gray-800" >
        {props.dropdown && props.dropdown.map((item, i) =>
          <div className="py-1 hover:text-purple-500">
            <NavLink to={item.href}>{item.label}</NavLink>
          </div>
        )}
      </div>}
    </div>
  );
}

const HamburgerNavItems = (props) => {
  return (
    <div className="">
      <div className="flex px-1">
        {props.dropdown && <a className="py-2 text-xl px-2 text-white cursor-pointer" onClick={() => { props.setPrevNavItems(props.currentNavItems); props.setCurrentNavItems(props.dropdown); }} >{props.label}</a>}
        {!props.dropdown && <NavLink className="py-2 text-xl px-2 text-white" to={props.href}>{props.label}</NavLink>}
        {props.dropdown && <svg className="fill-current w-2 cursor-pointer" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d="M10.28 4.305L5.989 8.598 1.695 4.305A1 1 0 00.28 5.72l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z"></path></svg>}
      </div>
    </div>
  );
}

const HamburgerNavContainer = ({ currentNavItems, setCurrentNavItems, prevNavItems, setPrevNavItems }) => {
  return (
    <>
      <div className="">
        <div className="flex px-1">
          {prevNavItems.length > 0 && <a className="py-2 text-xl px-2 text-white cursor-pointer" onClick={() => { setCurrentNavItems(prevNavItems); setPrevNavItems([]) }} >Return</a>}
        </div>
      </div>
      {currentNavItems.map((item, i) =>
        <HamburgerNavItems key={item.label} currentNavItems={currentNavItems} setPrevNavItems={setPrevNavItems} setCurrentNavItems={setCurrentNavItems} {...item}></HamburgerNavItems>
      )}
    </>
  );
}

const PrimaryNav = () => {
  const useGlobalState = React.useContext(GlobalStateContext);
  const [navItems, setNavItems] = useState(data);
  const [mobileNav, setMobileNav] = useState(false);
  const [currentNavItems, setCurrentNavItems] = useState(navItems);
  const [prevNavItems, setPrevNavItems] = useState([]);
  const homeAnchor = { href: "/signin", text: 'Sign In' };
  const myItems = { href: "/my-items", text: useGlobalState.state.user.discordHandle };

  //Our button can take an href or a clickEvent attribute
  const opts = {};
  opts['href'] = '/signup';
  opts['clickEvent'] = () => { console.log('clicked') };
  console.log(useGlobalState);

  const handleClick = () => {
    setMobileNav(!mobileNav)
  }

  return (
    <div className="min-w-full py-4 ">
      <nav className="w-11/12 mx-auto flex items-center">
        <div className="w-1/6">
          <Logo className="w-24 App-logo" logo={logo}></Logo>
        </div>

        <div className="w-3/4">
          {navItems.map((item, i) =>
            <NavItem key={item.label} {...item}></NavItem>
          )}
        </div>

        <div className="w-1/4 hidden lg:inline-block">
          {useGlobalState.state.user.discordHandle === undefined && <Anchor {...homeAnchor}></Anchor>}
          {useGlobalState.state.user.discordHandle === undefined && <Button className="hover:bg-purple-900 py-3 px-4 text-base bg-purple-500" {...opts} text='Sign Up'></Button>}
          {useGlobalState.state.user.discordHandle != undefined && <Anchor className="text-white" {...myItems}></Anchor>}
        </div>

        <div onClick={handleClick} className="lg:hidden flex justify-end w-1/4 pr-4">
          <svg className="w-6 text-white fill-current justify-end cursor-pointer" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect y="4" width="24" height="2" rx="1"></rect><rect y="11" width="24" height="2" rx="1"></rect><rect y="18" width="24" height="2" rx="1"></rect></svg>
        </div>

        {mobileNav && <div className="w-1/2 sm:w-1/2 md:w-1/4 bg-purple-900 absolute h-screen right-0 top-0 p-12 z-10" >
          <button onClick={handleClick}>
            <svg className="absolute fudge w-8 h-8 m-6 top-0 right-0" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 16 16" version="1.1">
              <title>CLOSE</title>
              <defs>
                <path d="M15.6818091,0.318190949 C16.1060636,0.742445548 16.1060636,1.43029816 15.6818091,1.85455276 L9.536,8 L15.6818091,14.1454472 C16.1060636,14.5697018 16.1060636,15.2575545 15.6818091,15.6818091 C15.2575545,16.1060636 14.5697018,16.1060636 14.1454472,15.6818091 L8,9.536 L1.85455276,15.6818091 C1.43029816,16.1060636 0.742445548,16.1060636 0.318190949,15.6818091 C-0.10606365,15.2575545 -0.10606365,14.5697018 0.318190949,14.1454472 L6.464,8 L0.318190949,1.85455276 C-0.10606365,1.43029816 -0.10606365,0.742445548 0.318190949,0.318190949 C0.742445548,-0.10606365 1.43029816,-0.10606365 1.85455276,0.318190949 L8,6.464 L14.1454472,0.318190949 C14.5697018,-0.10606365 15.2575545,-0.10606365 15.6818091,0.318190949 Z" id="path-1" />
              </defs>
              <g id="Style-Guide" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Account-Level-Notification" transform="translate(-800.000000, -1917.000000)">
                  <g id="Toast-Notifications" transform="translate(190.000000, 1463.000000)">
                    <g id="Toast-Notification---Success" transform="translate(0.000000, 431.000000)">
                      <g id="UI-Elements/Actions/Close-X/Medium" transform="translate(610.000000, 23.000000)">
                        <rect id="Rectangle" fill-rule="nonzero" x="0" y="0" width="16" height="16" />
                        <mask id="mask-2" fill="white">
                          <use href="#path-1" />
                        </mask>
                        <use id="Mask" fill="#FFF" fill-rule="nonzero" href="#path-1" />
                        <g id="Group" mask="url(#mask-2)" fill="#FFF" fill-rule="nonzero">
                          <g id="Color">
                            <rect id="Rectangle" x="0" y="0" width="16" height="16" />
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </button>
          <div>
            <HamburgerNavContainer prevNavItems={prevNavItems} setPrevNavItems={setPrevNavItems} currentNavItems={currentNavItems} setCurrentNavItems={setCurrentNavItems}></HamburgerNavContainer>
          </div>
        </div>}

      </nav>
    </div>
  );
};

export { PrimaryNav as default };