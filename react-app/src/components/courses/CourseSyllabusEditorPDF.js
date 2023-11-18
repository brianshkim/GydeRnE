import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ImageResize from 'quill-image-resize-module-react';
import ImageUploader from "quill-image-uploader";
import ReactQuill, { Quill } from 'react-quill'
import jsPDF from 'jspdf'
import './syllabus.css'
import usertempimage from "../images/usertempimage.jpg"
import { pdfExporter } from 'quill-to-pdf'
import { saveAs } from 'file-saver'

import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import 'react-quill/dist/quill.snow.css'
import parse from 'html-react-parser'
import MyDocument from './CourseSyllabusPDF';
import './syllabus.css'
import { create_syllabus } from '../../store/courses';


Quill.register('modules/imageResize', ImageResize)
Quill.register("modules/imageUploader", ImageUploader);


window.Quill = Quill

const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
]

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});


const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],

    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
    imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize']
    },

};







const CourseSyllabusEditorPDF = ({ setNewSyllabus }) => {
    let [value, setValue] = useState("hello")
    let [preview, setPreview] = useState("")
    let [toggle, setToggle] = useState(false)
    let inputRef = useRef(null)
    let [fileLoading, setFileLoading] = useState(false)
    let dispatch = useDispatch()
    let { courseId } = useParams()
    const doc = new jsPDF()
    const [errors, setErrors] = useState([]);
    const [imageLoading, setImageLoading] = useState(false);
    let [content, setContent] = useState(null)


    var quillObj = useRef(null);

    const downloadPDF = async () => {
        const doc = new jsPDF({
            format: "a4",
            unit: "px"
        });



        // Adding the fonts
        doc.setFont("Inter-Regular", "normal");

        doc.html(inputRef.current, {
            async callback(doc) {

                await doc.save("document");

            }
        });




    };

    useEffect(()=>{
        let doc = new jsPDF({
            format: "a4",
            unit: "px"

        })

        doc.html(inputRef.current, {

            async callback(doc) {

                let blob = doc.output('blob');
                console.log(blob)

                return blob


            }

        }).then(()=>{

        let blob1 = doc.output('blob')
        var blob = new Blob([blob1], {type: 'application/pdf'})
        console.log(blob)
        setContent(URL.createObjectURL(blob))
        })
    }, [value])






    useEffect(() => {
        if (typeof window?.MathJax !== "undefined") {
            window.MathJax.typesetClear()
            window.MathJax.typeset()
        }

    }, [value])

    console.log(content)


    return (
        <div >
            <div onClick={e => setNewSyllabus(false)}>Go back</div>
            <ReactQuill
                ref={quillObj}
                modules={modules}
                placeholder='compose here'
                value={value}
                onChange={setValue}
                formats={formats}
                preserveWhitespace={true}
                theme="snow" />
            <div>

                <button onClick={downloadPDF}>download</button>

            </div>




            <div>
                <div ref={inputRef} className="syllabus-container">

                    {parse(value)}

                </div>

                <object data={content} type="application/pdf" width="100%" height="100%">
      <p>Alternative text - include a link <a href="http://africau.edu/images/default/sample.pdf">to the PDF!</a></p>
  </object>



            </div>

        </div>




    )
}

export default CourseSyllabusEditorPDF
