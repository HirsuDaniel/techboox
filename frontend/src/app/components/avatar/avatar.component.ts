import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {
  @Input() userName!: string;
  initials: string = '';

  ngOnInit() {
    this.initials = this.generateInitials(this.userName);
  }

  generateInitials(name: string): string {
    if (!name) return '';
    const splitName = name.split(' ');
    return splitName.map(part => part.charAt(0).toUpperCase()).join('');
  }
}