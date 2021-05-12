/* eslint-disable react/button-has-type */
import React, {  useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMenu, storeInit } from '../redux/action/menu';

const Home = () => {
    const dispatch = useDispatch();
    const fileInput = useRef();
    const [inputData, setInputData] = useState({
        menu_name: '',
        price: '',
        image_url: {},
        preview_img_url: '',
    });

    const isSuccess = useSelector(state => state.menu.isSuccess);
    const inputChangeHandler = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        })
    }
    const inputFileChangeHandler = (e) => {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setInputData({
                ...inputData,
                image_url: e.target.files[0],
                preview_img_url: fileReader.result
            })
        }
        fileReader.readAsDataURL(e.target.files[0])
    };


    const setInputFormData = (isPreviewRemove) => {
        if(isPreviewRemove) {
            // input form에 있는 파일정보 초기화
            setInputData({
                ...inputData,
                image_url: {},
                preview_img_url: ''
            });
        } else {
            // 데이터 저장후 input form 입력 초기화
            setInputData({
                menu_name: '',
                price: 0,
                image_url: {},
                preview_img_url: ''
            });
        }
        // input file 선택후 셋팅된 파일명 초기화
        fileInput.current.value ='';
    }

    const saveMenu = () => {
        const formData = new FormData();
        const params = {
            menu_name: inputData.menu_name,
            price: inputData.price
        }

        /**
         *  strapi Upload file during entry creation
         *  기본 파일업로드 append parameter rule
         * 1번째: files.inputName 으로 [ files. ]은 필수 입력되어야 한다.
         * 2번째: 업로드 파일데이터 ( e.target.files[0] );
         * 3번째: e.target.files[0].name
         *
         * entry create rule
         * 1. formData key 값은 [ data ] 라는 값으로 필수값이다.
         * 2. formData value는 JSON.stringify()로 변환해야 한다.
         *
         *  reference: https://strapi.io/documentation/developer-docs/latest/development/plugins/upload.html#upload-file-during-entry-creation => Upload file during entry creation Tab
        */
        formData.append('files.image_url', inputData.image_url, inputData.image_url.name);
        formData.append('data', JSON.stringify(params));
        dispatch(createMenu(formData));
        dispatch(storeInit());
    }
    useEffect(() => {
        if(isSuccess){
            setInputFormData(false);
        }
    },[isSuccess])

    return (
        <div>
            <div> 새로운 메뉴 등록하기.</div>
            <div>
                <input type="text" name="menu_name" value={inputData.menu_name} onChange={(e) => inputChangeHandler(e)}/>
            </div>
            <div>
                <input type="text" name="price" value={inputData.price} onChange={(e) => inputChangeHandler(e)}/>
            </div>
            <div>
                <input type="file" name="image_url" ref={fileInput} onChange={(e) => inputFileChangeHandler(e)}/>
            </div>
            <div>
                <button onClick={() => saveMenu()}>등록</button>
            </div>
            <div>
                {
                    inputData.preview_img_url ?
                        <div>
                            <img src={inputData.preview_img_url} alt=""/>
                            <button onClick={() => setInputFormData(true)}>사진삭제</button>
                        </div>
                        : null
                }
            </div>
        </div>
    )
}

export default Home;