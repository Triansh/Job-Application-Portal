import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import LoopIcon from '@material-ui/icons/Loop';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import SmsIcon from '@material-ui/icons/Sms';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import GradeIcon from '@material-ui/icons/Grade';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import Button from '../Controls/Button';

export const FullButton = ({ ...rest }) => <Button disabled {...rest} style={{ border: '2px solid #BF00FF', borderRadius: '50px', color: '#7851A9' }} text="Full" size="medium" variant="outlined" startIcon={<AssignmentTurnedInIcon />} />;

export const ApplyNowButton = ({ ...rest }) => <Button {...rest} style={{ border: '2px solid #1F75FE', borderRadius: '50px', color: '#0000CD' }} text="Apply Now" size="medium" variant="outlined" startIcon={<ErrorOutlineIcon />} />;

export const AppliedButton = ({ ...rest }) => <Button disabled {...rest} style={{ border: '2px solid #FFEF00', borderRadius: '50px', color: '#DAA520' }} text="Applied" size="medium" variant="outlined" startIcon={<LoopIcon />} />;

export const AcceptButton = ({ text, ...rest }) => <Button {...rest} style={{ border: '2px solid #50C878', borderRadius: '50px', color: '#008080' }} text={text} size="medium" variant="outlined" startIcon={<CheckIcon />} />;

export const RejectButton = ({ text, ...rest }) => <Button {...rest} style={{ border: '2px solid #ED2939', borderRadius: '50px', color: '#960018' }} text={text} size="medium" variant="outlined" startIcon={<CloseIcon />} />;

export const ShortListButton = ({ text, ...rest }) => <Button {...rest} style={{ border: '2px solid #FF7F50', borderRadius: '50px', color: '#FF4F00' }} text={text} size="medium" variant="outlined" startIcon={<SmsIcon />} />;

export const RateNowButton = ({ onClick, ...rest }) => <Button {...rest} onClick={onClick} style={{ border: '2px solid #FFEF00', borderRadius: '50px', color: '#0000CD' }} text="Rate Now" size="medium" variant="outlined" startIcon={<GradeIcon />} />;

export const RatedButton = ({ ...rest }) => <Button disabled style={{ border: '2px solid #03C03C', borderRadius: '50px', color: '#1F75FE' }} text="Rated" size="medium" variant="outlined" endIcon={<ThumbUpIcon />} />;
