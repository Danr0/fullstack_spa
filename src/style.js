import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles({
    button: {
        background: 'darkorange',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'black',
        height: 48,
        padding: '0 30px',
    },
    input_form: {
        background: 'orange',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'black',
        padding: '0 30px',
        width: '300px'
    },
    input: {
        background: 'orange',
        color: 'black',
    },
    input_text: {
        background: 'white',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        height: 48,
    },
    menu_item: {
        background: 'orange',
    },
    menu: {
        color: 'orange',
    },
    bg: {
        background: 'white',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    main_page: {
        background: 'orange',
        'margin-top': '1%',
        'margin-left': '3%',
        'margin-right': '3%',
        'margin-bottom': '1%',
        //'min-height': '90vh'
    },
    text: {
        color: 'black',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        'font-family': "Times New Roman",
    },
    text_style: {
        color: 'black',
        'font-family': "Times New Roman",
    },
    list_item: {
        color: 'black',
        background: 'orange',
        display: 'flex',
        'flex-direction': 'column',
    }

});