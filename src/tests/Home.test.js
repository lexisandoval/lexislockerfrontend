import React from "react"
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

import Home from "../components/Home"

test('Home renders category link with correct href value', () => {
  render(<Router><Home /></Router>)
  const shopByCat = screen.getByAltText("shop by category")
  expect(shopByCat).toBeInTheDocument()
  expect(shopByCat.parentElement.getAttribute("href")).toBe("/categories")
})

test('Home renders clothing link with correct href value', () => {
  render(<Router><Home /></Router>)
  const viewAll = screen.getByAltText("view all clothing")
  expect(viewAll).toBeInTheDocument()
  expect(viewAll.parentElement.getAttribute("href")).toBe("/clothing")
})

test('Home renders main image', () => {
  render(<Router><Home /></Router>)
  const mainImg = screen.getByAltText("largehomeImg1")
  expect(mainImg).toBeInTheDocument()
})

test('Home renders social links with correct href values', () => {
  render(<Router><Home /></Router>)
  const email = screen.getByAltText("Email")
  const github = screen.getByAltText("Github")
  const linkedin = screen.getByAltText("LinkedIn")
  expect(email).toBeInTheDocument()
  expect(github).toBeInTheDocument()
  expect(linkedin).toBeInTheDocument()
  expect(email.parentElement.getAttribute("href")).toBe("mailto:alejandrasandoval@cognizant.com")
  expect(github.parentElement.getAttribute("href")).toBe("https://github.com/lexisandoval")
  expect(linkedin.parentElement.getAttribute("href")).toBe("https://www.linkedin.com/in/alejandramsandoval/")
})

test('Home renders email sign up', () => {
  render(<Router><Home /></Router>)
  const subscribeBtn = screen.getByText("Subscribe")
  expect(subscribeBtn).toBeInTheDocument()
})