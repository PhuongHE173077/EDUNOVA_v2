import React from 'react'
import { HeaderExam } from './components/Header'
import { ExamContent } from './components/ExamContent'

export default function page() {
    return (
        <>
            <HeaderExam />
            <main>
                <ExamContent />
            </main>
        </>
    )
}
