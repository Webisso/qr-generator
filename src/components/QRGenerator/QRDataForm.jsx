import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function QRDataForm({ type, data, onChange }) {
  const { t } = useTranslation();

  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const renderField = (name, label, placeholder, fieldType = 'text', options = {}) => {
    const { component = 'input', ...rest } = options;
    
    if (component === 'textarea') {
      return (
        <div className="space-y-2" key={name}>
          <Label htmlFor={name}>{label}</Label>
          <Textarea
            id={name}
            placeholder={placeholder}
            value={data[name] || ''}
            onChange={(e) => updateField(name, e.target.value)}
            {...rest}
          />
        </div>
      );
    }

    return (
      <div className="space-y-2" key={name}>
        <Label htmlFor={name}>{label}</Label>
        <Input
          id={name}
          type={fieldType}
          placeholder={placeholder}
          value={data[name] || ''}
          onChange={(e) => updateField(name, e.target.value)}
          {...rest}
        />
      </div>
    );
  };

  const renderSwitch = (name, label) => (
    <div className="flex items-center justify-between" key={name}>
      <Label htmlFor={name}>{label}</Label>
      <Switch
        id={name}
        checked={data[name] || false}
        onCheckedChange={(checked) => updateField(name, checked)}
      />
    </div>
  );

  const renderSelect = (name, label, options) => (
    <div className="space-y-2" key={name}>
      <Label htmlFor={name}>{label}</Label>
      <Select
        value={data[name] || options[0]?.value}
        onValueChange={(value) => updateField(name, value)}
      >
        <SelectTrigger id={name}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  const forms = {
    link: (
      <div className="space-y-4">
        {renderField('url', t('fields.url'), t('fields.urlPlaceholder'), 'url')}
      </div>
    ),

    text: (
      <div className="space-y-4">
        {renderField('text', t('fields.text'), t('fields.textPlaceholder'), 'text', { component: 'textarea' })}
      </div>
    ),

    email: (
      <div className="space-y-4">
        {renderField('email', t('fields.email'), t('fields.emailPlaceholder'), 'email')}
        {renderField('subject', t('fields.subject'), t('fields.subjectPlaceholder'))}
        {renderField('body', t('fields.body'), t('fields.bodyPlaceholder'), 'text', { component: 'textarea' })}
      </div>
    ),

    phone: (
      <div className="space-y-4">
        {renderField('phone', t('fields.phone'), t('fields.phonePlaceholder'), 'tel')}
      </div>
    ),

    sms: (
      <div className="space-y-4">
        {renderField('phone', t('fields.phone'), t('fields.phonePlaceholder'), 'tel')}
        {renderField('message', t('fields.message'), t('fields.messagePlaceholder'), 'text', { component: 'textarea' })}
      </div>
    ),

    wifi: (
      <div className="space-y-4">
        {renderField('networkName', t('fields.networkName'), t('fields.networkNamePlaceholder'))}
        {renderField('password', t('fields.password'), t('fields.passwordPlaceholder'), 'password')}
        {renderSelect('encryption', t('fields.encryption'), [
          { value: 'WPA', label: t('encryption.wpa') },
          { value: 'WEP', label: t('encryption.wep') },
          { value: 'nopass', label: t('encryption.none') },
        ])}
        {renderSwitch('hidden', t('fields.hidden'))}
      </div>
    ),

    vcard: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {renderField('firstName', t('fields.firstName'), t('fields.firstNamePlaceholder'))}
          {renderField('lastName', t('fields.lastName'), t('fields.lastNamePlaceholder'))}
        </div>
        {renderField('organization', t('fields.organization'), t('fields.organizationPlaceholder'))}
        {renderField('title', t('fields.title'), t('fields.titlePlaceholder'))}
        <div className="grid grid-cols-2 gap-4">
          {renderField('mobile', t('fields.mobile'), t('fields.mobilePlaceholder'), 'tel')}
          {renderField('phone', t('fields.work'), t('fields.workPlaceholder'), 'tel')}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {renderField('homePhone', t('fields.home'), t('fields.homePlaceholder'), 'tel')}
          {renderField('fax', t('fields.fax'), t('fields.faxPlaceholder'), 'tel')}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {renderField('email', t('fields.emailWork'), t('fields.emailPlaceholder'), 'email')}
          {renderField('emailPersonal', t('fields.emailPersonal'), t('fields.emailPlaceholder'), 'email')}
        </div>
        {renderField('website', t('fields.website'), t('fields.websitePlaceholder'), 'url')}
        {renderField('street', t('fields.street'), t('fields.streetPlaceholder'))}
        <div className="grid grid-cols-2 gap-4">
          {renderField('city', t('fields.city'), t('fields.cityPlaceholder'))}
          {renderField('state', t('fields.state'), t('fields.statePlaceholder'))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {renderField('zipCode', t('fields.zipCode'), t('fields.zipCodePlaceholder'))}
          {renderField('country', t('fields.country'), t('fields.countryPlaceholder'))}
        </div>
        {renderField('note', t('fields.note'), t('fields.notePlaceholder'), 'text', { component: 'textarea' })}
      </div>
    ),

    event: (
      <div className="space-y-4">
        {renderField('eventTitle', t('fields.eventTitle'), t('fields.eventTitlePlaceholder'))}
        {renderField('description', t('fields.description'), t('fields.descriptionPlaceholder'), 'text', { component: 'textarea' })}
        {renderField('location', t('fields.location'), t('fields.locationPlaceholder'))}
        <div className="grid grid-cols-2 gap-4">
          {renderField('startDate', t('fields.startDate'), '', 'datetime-local')}
          {renderField('endDate', t('fields.endDate'), '', 'datetime-local')}
        </div>
        {renderSwitch('allDay', t('fields.allDay'))}
      </div>
    ),

    location: (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {renderField('latitude', t('fields.latitude'), t('fields.latitudePlaceholder'), 'number')}
          {renderField('longitude', t('fields.longitude'), t('fields.longitudePlaceholder'), 'number')}
        </div>
      </div>
    ),

    whatsapp: (
      <div className="space-y-4">
        {renderField('whatsappNumber', t('fields.whatsappNumber'), t('fields.whatsappNumberPlaceholder'), 'tel')}
        {renderField('message', t('fields.message'), t('fields.messagePlaceholder'), 'text', { component: 'textarea' })}
      </div>
    ),

    bitcoin: (
      <div className="space-y-4">
        {renderField('bitcoinAddress', t('fields.bitcoinAddress'), t('fields.bitcoinAddressPlaceholder'))}
        {renderField('amount', t('fields.amount'), t('fields.amountPlaceholder'), 'number')}
        {renderField('label', t('fields.label'), t('fields.labelPlaceholder'))}
        {renderField('message', t('fields.message'), t('fields.messagePlaceholder'))}
      </div>
    ),

    twitter: (
      <div className="space-y-4">
        {renderField('username', t('fields.username'), t('fields.usernamePlaceholder'))}
        {renderField('tweetText', t('fields.tweetText'), t('fields.tweetTextPlaceholder'), 'text', { component: 'textarea' })}
      </div>
    ),

    facebook: (
      <div className="space-y-4">
        {renderField('profileUrl', t('fields.profileUrl'), t('fields.profileUrlPlaceholder'), 'url')}
      </div>
    ),

    instagram: (
      <div className="space-y-4">
        {renderField('username', t('fields.username'), t('fields.usernamePlaceholder'))}
      </div>
    ),

    youtube: (
      <div className="space-y-4">
        {renderField('videoUrl', t('fields.videoUrl'), t('fields.videoUrlPlaceholder'), 'url')}
      </div>
    ),

    linkedin: (
      <div className="space-y-4">
        {renderField('profileUrl', t('fields.profileUrl'), t('fields.profileUrlPlaceholder'), 'url')}
      </div>
    ),

    spotify: (
      <div className="space-y-4">
        {renderField('trackUrl', t('fields.trackUrl'), t('fields.trackUrlPlaceholder'), 'url')}
      </div>
    ),
  };

  return forms[type] || null;
}
