import React from 'react'
import { NextPage } from 'next'
import { Container } from '../../components/styled-component/Global'
import Image from 'next/image'
import Layout from '../../components/Layout'

const messages: NextPage = () => {
  return (
    <Layout>
        <Container>
          <h1>No Message Yet</h1>
        </Container>
    </Layout>
  )
}

export default messages