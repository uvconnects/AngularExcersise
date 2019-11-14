import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedBack, ContactType } from '../shared/feedback';
import { visibility, flyInOut, expand } from '../animations/app.animations';
import { ContactService } from '../services/contact.service';
import { delay } from 'rxjs/operators';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display:block;'
  },
  animations: [
    visibility(), flyInOut(), expand()
  ]
})
export class ContactComponent implements OnInit {
  feedbackForm: FormGroup;
  feedback: FeedBack;
  contacttype = ContactType;
  contactcopy: FeedBack;
  errorMsg: string;
  showForm = true;
  visibility='shown';
  showspinner = false;
  headertext: string;
  @ViewChild('cfform', { static: false }) feedbackFormDirect: any;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'telnum': '',
    'email': '',
    'contacttype': '',
    'message': ''
  };

  validationMessages = {
    'firstname': {
      'required': 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required': 'Last Name is required.',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required': 'Tel. number is required.',
      'pattern': 'Tel. number must contain only numbers.'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
    },
  };

  constructor(private fb: FormBuilder, private ct: ContactService) {
    this.createForm();
  }
  ngOnInit() {
  }
  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // reset validation messages now

  }
  onValueChanged(data?: any) {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }
  onSubmit() {
    this.showspinner = true;
    this.headertext = 'Submitting Form';
    this.visibility = 'hidden';
    this.showForm = false;
    this.ct.putcontacts(this.feedbackForm.value).subscribe(feedback => {
      this.showspinner = false;
      this.feedback = feedback;
      setTimeout(function(){
        this.showForm = true;
      }, 5000);
        errorMsg => { this.feedback = null; this.errorMsg = <any>errorMsg; }
    });
  

   
  }
  resetformafter5seconds(): void {
    this.visibility = 'shown'
    this.headertext = '';
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }
}
